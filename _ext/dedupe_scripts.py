"""Write each script tag once per page.

sphinx-thebe and sphinx-togglebutton register their inline configuration when an event fires, and in a
Jupyter Book build those events fire twice, so every page declared `const THEBE_JS_URL` twice and the
second copy failed with a SyntaxError. The copies are added at different points (some after other
html-page-context handlers), so instead of pruning the list this wraps the page's `js_tag` renderer:
a script whose file or inline body was already written is skipped.
"""


def _unique_js_tags(app, pagename, templatename, context, doctree):
    js_tag = context.get("js_tag")
    if js_tag is None:
        return
    written = set()

    def unique_js_tag(js):
        # An inline script has no file; its two copies carry None and "" for it.
        filename = js if isinstance(js, str) else getattr(js, "filename", None) or ""
        key = (filename, getattr(js, "attributes", {}).get("body"))
        if key in written:
            return ""
        written.add(key)
        return js_tag(js)

    context["js_tag"] = unique_js_tag


def setup(app):
    # First, because html-page-context stops at the first handler that returns a template.
    app.connect("html-page-context", _unique_js_tags, priority=10)
    return {"parallel_read_safe": True, "parallel_write_safe": True}
