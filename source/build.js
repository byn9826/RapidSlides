import React, { Component } from "react"
import Com from "./components.js";


function buildMain( script, theme ) {
    switch ( script[1] ) {
        case "CoverDefaultFull":
            return <Com.CoverDefaultFull script={script} theme={theme} />;
    }
}


function buildFooter( theme, script, page ) {
    if ( script[page][1].search( "Single" ) !== -1 ) {
        switch ( theme.footer.template ) {
            case "FooterDefaultCopyright":
                 return <Com.FooterDefaultCopyright theme={theme} />;
        }
    }
}


module.exports = {
    buildMain: buildMain,
	buildFooter: buildFooter
};