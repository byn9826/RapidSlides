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
	},
	Ban: {
		//each template consist of title, desc, detail, image four fields
		//if desc, detail image are not required by any template they could be banned here
		"CoverDefaultFull": [ "Detail" ]
	}
};