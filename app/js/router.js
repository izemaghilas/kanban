"use strict";

import Drawer from "./drawer.js";

const drawer = new Drawer();

export default function Router() {
    // custom event triggered when the url changed
    // as history.pushState() didn't trigger 'popstate' event
    this.pageChangeEvent = new CustomEvent("pagechange");
    this.routes = [];
    this.add = function(path, element) {
        this.routes.push({
            path: path,
            element: element
        });
        return this;
    };
    this.setPath = function(path) {
        history.pushState(null, "", location.origin + path);
        window.dispatchEvent(this.pageChangeEvent);
    }
    this.draw = function() {
        const path = location.pathname;
        const e = this.routes.find(p=>p.path===path);
        drawer.draw(e.element);
    }
}


//const router = new Router();