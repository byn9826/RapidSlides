//All template file should be imported here, build them in build.js
import CoverDefaultFull from "./temp/CoverDefaultFull";
import IndexDefaultHouse from "./temp/IndexDefaultHouse";
import SingleDefaultPic from "./temp/SingleDefaultPic";
import FooterDefaultCopyright from "./temp/FooterDefaultCopyright";

module.exports = {
	Cover: {
		"DefaultFull": CoverDefaultFull
	},
	Index: {
		"DefaultHouse": IndexDefaultHouse
	},
	Single: {
		"DefaultPic": SingleDefaultPic
	},
	Footer: {
		"DefaultCopyright": FooterDefaultCopyright
	},
	Ban: {
		//each template consist of title, desc, detail, image four fields
		//if desc, detail, image fields are not required by any template they could be banned here
		"CoverDefaultFull": [ "Detail" ]
	}
};