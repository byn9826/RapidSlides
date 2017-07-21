//All template file should be imported here, build them in build.js

import CoverDefaultFull from "./temp/CoverDefaultFull";
//import ContentDefaultHouse from "./temp/ContentDefaultHouse";
import SingleDefaultPic from "./temp/SingleDefaultPic";
import FooterDefaultCopyright from "./temp/FooterDefaultCopyright";

module.exports = {
	Cover: {
		"DefaultFull": CoverDefaultFull
	},
	Single: {
		"DefaultPic": SingleDefaultPic
	},
	Footer: {
		"DefaultCopyright": FooterDefaultCopyright
	}
};