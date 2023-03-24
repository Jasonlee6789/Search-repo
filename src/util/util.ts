export default function throttle<T extends (...args: any[]) => any>(
	func: T,
	limit: number
): T {
	let lastFunc: ReturnType<typeof setTimeout>
	let lastRan: number

	const throttledFunc = function (
		this: ThisParameterType<T>,
		...args: Parameters<T>
	) {
		const context = this

		if (!lastRan) {
			func.apply(context, args)
			lastRan = Date.now()
		} else {
			clearTimeout(lastFunc)
			lastFunc = setTimeout(() => {
				if (Date.now() - lastRan >= limit) {
					func.apply(context, args)
					lastRan = Date.now()
				}
			}, limit - (Date.now() - lastRan))
		}
	} as unknown as T

	return throttledFunc
}
