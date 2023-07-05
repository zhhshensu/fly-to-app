declare interface CheckOsType {
	ua: string
	isAndroid: boolean
	isIOS: boolean
	isIOS9plus: boolean
	qqBrower: boolean
}

declare interface OpenAppOptions {
	source: string
	target: string
	iosBrowserUser?: string
	androidBrowserUser?: string
	isApp?: boolean
	cb?: (data?: CheckOsType) => void
}
declare function openApp(): void
declare function checkOs(): CheckOsType

export { openApp, checkOs, CheckOsType, OpenAppOptions }
