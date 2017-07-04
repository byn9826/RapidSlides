import React, { Component } from "react"
import Com from "./components.js";


function buildFooter( theme ) {
    let result;
    switch ( theme.footer.template ) {
        case "FooterDefaultCopyright":
            return <Com.FooterDefaultCopyright theme={theme} />;
    }
}


module.exports = {
	buildFooter: buildFooter,
};