//all template file should be build here, import them in components.js

import React, { Component } from "react"
import Com from "./components.js";

function buildContent( theme, script, page, full ) {
    let copyScript = JSON.parse( JSON.stringify( script ) );
    copyScript[ page ] && copyScript[ page ].detail 
        ? copyScript[ page ].detail = copyScript[ page ].detail.split( ";" ) : null;
    if ( script[ page ] ) {
        if ( script[ page ].type === "Cover" ) {
            switch ( script[ page ].template ) {
                case "DefaultFull":
                    return <Com.Cover.DefaultFull 
                        theme={ theme } script={ copyScript } page={ page } full={ full } 
                    />;
            }
        } else if ( script[ page ].type === "Index" ) {
            switch ( script[ page ].template ) {
                case "DefaultHouse":
                    return <Com.Index.DefaultHouse 
                        theme={ theme } script={ copyScript } page={ page } full={ full } 
                    />;
            }
        } else if ( script[ page ].type === "Single" ) {
            switch ( script[ page ].template ) {
                case "DefaultPic":
                    return <Com.Single.DefaultPic 
                        theme={ theme } script={ copyScript } page={ page } full={ full } 
                    />;
            }
        }
    }
}

function buildFooter( theme, script, page ) {
    let info = script[ page ];
    if ( info && info.template && info.type && info.type !== "Cover" ) {
        switch ( theme.footer.template ) {
            case "DefaultCopyright":
                 return <Com.Footer.DefaultCopyright theme={ theme } />;
            default:
                return false;
        }
    }
}

module.exports = {
    buildContent: buildContent,
	buildFooter: buildFooter
};