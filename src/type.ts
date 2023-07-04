export interface CheckOsType {
	ua: string;
	isAndroid: boolean;
	isIOS: boolean;
	isIOS9plus: boolean;
	qqBrower: boolean;
}

export interface OpenAppOptions {
	source: string;
	target: string;
	iosBrowserUser: string;
	androidBrowserUser: string;
	isApp: boolean;
	cb: (data?: CheckOsType) => void;
}
