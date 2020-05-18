import * as fs from 'fs'

async function loadLibrary<LibraryInterface>(
	path: string,
	watch: boolean | number = false,
	onLoad: (library: LibraryInterface) => Promise<void> = null,
): Promise<LibraryInterface> {
	async function load<LibraryInterface>(path: string): Promise<LibraryInterface> {
		if (!fs.existsSync(path)) return null
		if (!fs.lstatSync(path).isFile()) throw `'path' ${path} is not a file.`
		return (await import(path)) as LibraryInterface
	}
	const watchIsNumber = !isNaN(Number(watch))

	return new Promise<LibraryInterface>(async (resolve) => {
		if (watch) {
			let library
			const interval = setInterval(
				async (): Promise<void> => {
					library = await load<LibraryInterface>(path)
					if (library) {
						clearInterval(interval)
						if (onLoad) {
							await onLoad(library)
							fs.watchFile(
								path,
								async (): Promise<void> => {
									await onLoad(await load(path))
								},
							)
						}
						resolve(library)
					}
				},
				watchIsNumber ? (watch as number) : 3000,
			)
		} else {
			const library = await load<LibraryInterface>(path)
			if (onLoad) await onLoad(library)
			resolve(library)
		}
	})
}

export default loadLibrary
