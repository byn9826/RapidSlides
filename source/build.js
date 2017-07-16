import React, { Component } from "react"
import Com from "./components.js";


function buildContent( theme, script, page ) {
    if ( script[ page ].type === "Cover" ) {
        switch ( script[ page ].template ) {
            case "DefaultFull":
                return <Com.Cover.DefaultFull theme={ theme } script={ script } page={ page } />;
        }
    }
}

/*
function buildFooter( theme, script, page ) {
    if ( script[ page ][ 1 ].search( "Cover" ) === -1 ) {
        switch ( theme.footer.template ) {
            case "FooterDefaultCopyright":
                 return <Com.FooterDefaultCopyright theme={ theme } />;
        }
    }
}
*/

module.exports = {
    buildContent: buildContent,
	//buildFooter: buildFooter
};