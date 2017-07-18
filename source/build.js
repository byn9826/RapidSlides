import React, { Component } from "react"
import Com from "./components.js";

function buildContent( theme, script, page ) {
    if ( script[ page ] ) {
        if ( script[ page ].type === "Cover" ) {
            switch ( script[ page ].template ) {
                case "DefaultFull":
                    return <Com.Cover.DefaultFull theme={ theme } script={ script } page={ page } />;
            }
        } else if ( script[ page ].type === "Single" ) {
            switch ( script[ page ].template ) {
                case "DefaultPic":
                    return <Com.Single.DefaultPic theme={ theme } script={ script } page={ page } />;
            }
        }
    }
}

function buildFooter( theme, script, page ) {
    if ( script[ page ] && script[ page ].type !== "Cover" ) {
        switch ( theme.footer.template ) {
            case "DefaultCopyright":
                 return <Com.Footer.DefaultCopyright theme={ theme } />;
        }
    }
}

module.exports = {
    buildContent: buildContent,
	buildFooter: buildFooter
};