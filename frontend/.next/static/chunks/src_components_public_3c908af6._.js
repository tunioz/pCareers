(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/public/ImageWithFallback.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ImageWithFallback",
    ()=>ImageWithFallback
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
const ERROR_IMG_SRC = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==';
function ImageWithFallback(props) {
    _s();
    const [didError, setDidError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleError = ()=>{
        setDidError(true);
    };
    const { src, alt, style, className, ...rest } = props;
    if (didError) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: className,
            style: {
                ...style,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f3f4f6'
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                src: ERROR_IMG_SRC,
                alt: "Error loading image",
                ...rest,
                "data-original-url": src
            }, void 0, false, {
                fileName: "[project]/src/components/public/ImageWithFallback.tsx",
                lineNumber: 29,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/public/ImageWithFallback.tsx",
            lineNumber: 19,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
        src: src,
        alt: alt,
        className: className,
        style: style,
        ...rest,
        onError: handleError
    }, void 0, false, {
        fileName: "[project]/src/components/public/ImageWithFallback.tsx",
        lineNumber: 40,
        columnNumber: 5
    }, this);
}
_s(ImageWithFallback, "QMNzFKr35q4hEDRZ59yrU4N+ufk=");
_c = ImageWithFallback;
var _c;
__turbopack_context__.k.register(_c, "ImageWithFallback");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/public/home/HeroSection.module.scss [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "background": "HeroSection-module-scss-module__ueKzjq__background",
  "content": "HeroSection-module-scss-module__ueKzjq__content",
  "cta": "HeroSection-module-scss-module__ueKzjq__cta",
  "ctaButton": "HeroSection-module-scss-module__ueKzjq__ctaButton",
  "description": "HeroSection-module-scss-module__ueKzjq__description",
  "grid": "HeroSection-module-scss-module__ueKzjq__grid",
  "heading": "HeroSection-module-scss-module__ueKzjq__heading",
  "hero": "HeroSection-module-scss-module__ueKzjq__hero",
  "inner": "HeroSection-module-scss-module__ueKzjq__inner",
  "label": "HeroSection-module-scss-module__ueKzjq__label",
  "overlay": "HeroSection-module-scss-module__ueKzjq__overlay",
  "textContent": "HeroSection-module-scss-module__ueKzjq__textContent",
  "wrapper": "HeroSection-module-scss-module__ueKzjq__wrapper",
});
}),
"[project]/src/components/public/home/HeroSection.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HeroSection",
    ()=>HeroSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$ImageWithFallback$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/public/ImageWithFallback.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$HeroSection$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/public/home/HeroSection.module.scss [app-client] (css module)");
'use client';
;
;
;
;
;
function HeroSection() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$HeroSection$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].hero,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                "aria-hidden": "true",
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$HeroSection$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].background,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$ImageWithFallback$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ImageWithFallback"], {
                        src: "https://images.unsplash.com/photo-1497366216548-37526070297c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
                        alt: ""
                    }, void 0, false, {
                        fileName: "[project]/src/components/public/home/HeroSection.tsx",
                        lineNumber: 12,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$HeroSection$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].overlay
                    }, void 0, false, {
                        fileName: "[project]/src/components/public/home/HeroSection.tsx",
                        lineNumber: 16,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/public/home/HeroSection.tsx",
                lineNumber: 11,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$HeroSection$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].content,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$HeroSection$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].inner,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$HeroSection$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].wrapper,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$HeroSection$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].grid,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$HeroSection$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].textContent,
                                initial: {
                                    opacity: 0,
                                    y: 50
                                },
                                animate: {
                                    opacity: 1,
                                    y: 0
                                },
                                transition: {
                                    duration: 0.8
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$HeroSection$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].label,
                                        initial: {
                                            opacity: 0,
                                            y: 20
                                        },
                                        animate: {
                                            opacity: 1,
                                            y: 0
                                        },
                                        transition: {
                                            delay: 0.2,
                                            duration: 0.6
                                        },
                                        children: "CAREER OPPORTUNITIES"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/public/home/HeroSection.tsx",
                                        lineNumber: 29,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].h1, {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$HeroSection$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].heading,
                                        initial: {
                                            opacity: 0,
                                            y: 30
                                        },
                                        animate: {
                                            opacity: 1,
                                            y: 0
                                        },
                                        transition: {
                                            delay: 0.3,
                                            duration: 0.8
                                        },
                                        children: "24 million people trust us with their data. We need engineers who take that personally."
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/public/home/HeroSection.tsx",
                                        lineNumber: 38,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].p, {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$HeroSection$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].description,
                                        initial: {
                                            opacity: 0,
                                            y: 30
                                        },
                                        animate: {
                                            opacity: 1,
                                            y: 0
                                        },
                                        transition: {
                                            delay: 0.4,
                                            duration: 0.8
                                        },
                                        children: "We ship code that 24 million people depend on every day. The bar is high. The work is real."
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/public/home/HeroSection.tsx",
                                        lineNumber: 47,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$HeroSection$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cta,
                                        initial: {
                                            opacity: 0,
                                            y: 30
                                        },
                                        animate: {
                                            opacity: 1,
                                            y: 0
                                        },
                                        transition: {
                                            delay: 0.5,
                                            duration: 0.8
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/careers",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$HeroSection$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].ctaButton,
                                                whileHover: {
                                                    scale: 1.05
                                                },
                                                whileTap: {
                                                    scale: 0.95
                                                },
                                                children: "See open roles"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/public/home/HeroSection.tsx",
                                                lineNumber: 63,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/public/home/HeroSection.tsx",
                                            lineNumber: 62,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/public/home/HeroSection.tsx",
                                        lineNumber: 56,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/public/home/HeroSection.tsx",
                                lineNumber: 23,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/public/home/HeroSection.tsx",
                            lineNumber: 22,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/public/home/HeroSection.tsx",
                        lineNumber: 21,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/public/home/HeroSection.tsx",
                    lineNumber: 20,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/public/home/HeroSection.tsx",
                lineNumber: 19,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/public/home/HeroSection.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, this);
}
_c = HeroSection;
var _c;
__turbopack_context__.k.register(_c, "HeroSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/public/home/ImpactNumbers.module.scss [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "container": "ImpactNumbers-module-scss-module__a6drWq__container",
  "grid": "ImpactNumbers-module-scss-module__a6drWq__grid",
  "label": "ImpactNumbers-module-scss-module__a6drWq__label",
  "number": "ImpactNumbers-module-scss-module__a6drWq__number",
  "section": "ImpactNumbers-module-scss-module__a6drWq__section",
  "stat": "ImpactNumbers-module-scss-module__a6drWq__stat",
});
}),
"[project]/src/components/public/home/ImpactNumbers.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ImpactNumbers",
    ()=>ImpactNumbers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/use-in-view.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$ImpactNumbers$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/public/home/ImpactNumbers.module.scss [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function ImpactNumbers() {
    _s();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const isInView = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"])(ref, {
        once: true,
        margin: '-100px'
    });
    const stats = [
        {
            number: '24M+',
            label: 'Users worldwide'
        },
        {
            number: '175+',
            label: 'Countries'
        },
        {
            number: '500+',
            label: 'Petabytes Stored'
        },
        {
            number: '13+',
            label: 'Years of Excellence'
        },
        {
            number: '99.92%',
            label: 'Uptime'
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        ref: ref,
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$ImpactNumbers$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].section,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$ImpactNumbers$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].container,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$ImpactNumbers$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].grid,
                children: stats.map((stat, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$ImpactNumbers$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].stat,
                        initial: {
                            opacity: 0,
                            y: 50
                        },
                        animate: isInView ? {
                            opacity: 1,
                            y: 0
                        } : {},
                        transition: {
                            delay: index * 0.1,
                            duration: 0.6
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$ImpactNumbers$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].number,
                                initial: {
                                    scale: 0
                                },
                                animate: isInView ? {
                                    scale: 1
                                } : {},
                                transition: {
                                    delay: index * 0.1 + 0.3,
                                    duration: 0.5,
                                    type: 'spring'
                                },
                                children: stat.number
                            }, void 0, false, {
                                fileName: "[project]/src/components/public/home/ImpactNumbers.tsx",
                                lineNumber: 31,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$ImpactNumbers$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].label,
                                children: stat.label
                            }, void 0, false, {
                                fileName: "[project]/src/components/public/home/ImpactNumbers.tsx",
                                lineNumber: 39,
                                columnNumber: 15
                            }, this)
                        ]
                    }, stat.label, true, {
                        fileName: "[project]/src/components/public/home/ImpactNumbers.tsx",
                        lineNumber: 24,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/public/home/ImpactNumbers.tsx",
                lineNumber: 22,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/public/home/ImpactNumbers.tsx",
            lineNumber: 21,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/public/home/ImpactNumbers.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
_s(ImpactNumbers, "DljcBprJKYjULUac3YKdUV9OwZQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"]
    ];
});
_c = ImpactNumbers;
var _c;
__turbopack_context__.k.register(_c, "ImpactNumbers");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/public/home/WhoWeAre.module.scss [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "bgDecoration": "WhoWeAre-module-scss-module__83T0uG__bgDecoration",
  "boxContent": "WhoWeAre-module-scss-module__83T0uG__boxContent",
  "boxText": "WhoWeAre-module-scss-module__83T0uG__boxText",
  "boxTitle": "WhoWeAre-module-scss-module__83T0uG__boxTitle",
  "container": "WhoWeAre-module-scss-module__83T0uG__container",
  "contentBox": "WhoWeAre-module-scss-module__83T0uG__contentBox",
  "contentBoxSmall": "WhoWeAre-module-scss-module__83T0uG__contentBoxSmall",
  "fullHeightContent": "WhoWeAre-module-scss-module__83T0uG__fullHeightContent",
  "grid": "WhoWeAre-module-scss-module__83T0uG__grid",
  "imageBox": "WhoWeAre-module-scss-module__83T0uG__imageBox",
  "imageBoxWide": "WhoWeAre-module-scss-module__83T0uG__imageBoxWide",
  "readMoreLink": "WhoWeAre-module-scss-module__83T0uG__readMoreLink",
  "section": "WhoWeAre-module-scss-module__83T0uG__section",
  "titleBox": "WhoWeAre-module-scss-module__83T0uG__titleBox",
  "titleBoxHeading": "WhoWeAre-module-scss-module__83T0uG__titleBoxHeading",
});
}),
"[project]/src/components/public/home/WhoWeAre.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WhoWeAre",
    ()=>WhoWeAre
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/use-in-view.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$ImageWithFallback$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/public/ImageWithFallback.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$WhoWeAre$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/public/home/WhoWeAre.module.scss [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function WhoWeAre() {
    _s();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const isInView = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"])(ref, {
        once: true,
        margin: '-100px'
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        ref: ref,
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$WhoWeAre$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].section,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$WhoWeAre$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].container,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$WhoWeAre$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].grid,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$WhoWeAre$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].titleBox,
                        initial: {
                            opacity: 0,
                            y: 30
                        },
                        animate: isInView ? {
                            opacity: 1,
                            y: 0
                        } : {},
                        transition: {
                            duration: 0.6
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$WhoWeAre$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].titleBoxHeading,
                                children: "Who We Are"
                            }, void 0, false, {
                                fileName: "[project]/src/components/public/home/WhoWeAre.tsx",
                                lineNumber: 24,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/about",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$WhoWeAre$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].readMoreLink,
                                children: [
                                    "See how we build",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
                                        animate: {
                                            x: [
                                                0,
                                                5,
                                                0
                                            ]
                                        },
                                        transition: {
                                            duration: 1.5,
                                            repeat: Infinity
                                        },
                                        children: "→"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/public/home/WhoWeAre.tsx",
                                        lineNumber: 29,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/public/home/WhoWeAre.tsx",
                                lineNumber: 27,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/public/home/WhoWeAre.tsx",
                        lineNumber: 18,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$WhoWeAre$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].imageBox,
                        initial: {
                            opacity: 0,
                            y: 30
                        },
                        animate: isInView ? {
                            opacity: 1,
                            y: 0
                        } : {},
                        transition: {
                            delay: 0.1,
                            duration: 0.6
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$ImageWithFallback$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ImageWithFallback"], {
                            src: "https://images.unsplash.com/photo-1646153114001-495dfb56506d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
                            alt: "Modern tech office workspace"
                        }, void 0, false, {
                            fileName: "[project]/src/components/public/home/WhoWeAre.tsx",
                            lineNumber: 45,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/public/home/WhoWeAre.tsx",
                        lineNumber: 39,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$WhoWeAre$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].contentBox,
                        initial: {
                            opacity: 0,
                            scale: 0.95
                        },
                        animate: isInView ? {
                            opacity: 1,
                            scale: 1
                        } : {},
                        transition: {
                            delay: 0.2,
                            duration: 0.6
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$WhoWeAre$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].bgDecoration,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    width: "250",
                                    height: "200",
                                    viewBox: "0 0 250 200",
                                    fill: "none",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                            cx: "125",
                                            cy: "100",
                                            r: "70",
                                            stroke: "white",
                                            strokeWidth: "3",
                                            fill: "none"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/public/home/WhoWeAre.tsx",
                                            lineNumber: 60,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                            cx: "125",
                                            cy: "100",
                                            r: "50",
                                            stroke: "white",
                                            strokeWidth: "3",
                                            fill: "none"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/public/home/WhoWeAre.tsx",
                                            lineNumber: 61,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                            cx: "125",
                                            cy: "100",
                                            r: "30",
                                            stroke: "white",
                                            strokeWidth: "3",
                                            fill: "none"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/public/home/WhoWeAre.tsx",
                                            lineNumber: 62,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                            cx: "125",
                                            cy: "100",
                                            r: "10",
                                            stroke: "white",
                                            strokeWidth: "3",
                                            fill: "none"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/public/home/WhoWeAre.tsx",
                                            lineNumber: 63,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                            x1: "125",
                                            y1: "20",
                                            x2: "125",
                                            y2: "180",
                                            stroke: "white",
                                            strokeWidth: "2"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/public/home/WhoWeAre.tsx",
                                            lineNumber: 64,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                            x1: "45",
                                            y1: "100",
                                            x2: "205",
                                            y2: "100",
                                            stroke: "white",
                                            strokeWidth: "2"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/public/home/WhoWeAre.tsx",
                                            lineNumber: 65,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/public/home/WhoWeAre.tsx",
                                    lineNumber: 59,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/public/home/WhoWeAre.tsx",
                                lineNumber: 58,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$WhoWeAre$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].boxContent,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$WhoWeAre$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].boxTitle,
                                        children: "Our Mission"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/public/home/WhoWeAre.tsx",
                                        lineNumber: 69,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$WhoWeAre$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].boxText,
                                        children: "We build the vault where 24 million people keep their most important data — family photos, business documents, passwords, memories. Every line of code either earns that trust or breaks it."
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/public/home/WhoWeAre.tsx",
                                        lineNumber: 72,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/public/home/WhoWeAre.tsx",
                                lineNumber: 68,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/public/home/WhoWeAre.tsx",
                        lineNumber: 52,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$WhoWeAre$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].imageBox, " ").concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$WhoWeAre$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].imageBoxWide),
                        initial: {
                            opacity: 0,
                            y: 30
                        },
                        animate: isInView ? {
                            opacity: 1,
                            y: 0
                        } : {},
                        transition: {
                            delay: 0.3,
                            duration: 0.6
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$ImageWithFallback$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ImageWithFallback"], {
                            src: "https://images.unsplash.com/photo-1758873269317-51888e824b28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
                            alt: "Diverse team collaboration"
                        }, void 0, false, {
                            fileName: "[project]/src/components/public/home/WhoWeAre.tsx",
                            lineNumber: 85,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/public/home/WhoWeAre.tsx",
                        lineNumber: 79,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$WhoWeAre$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].contentBox, " ").concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$WhoWeAre$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].contentBoxSmall),
                        initial: {
                            opacity: 0,
                            y: 30
                        },
                        animate: isInView ? {
                            opacity: 1,
                            y: 0
                        } : {},
                        transition: {
                            delay: 0.4,
                            duration: 0.6
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$WhoWeAre$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].fullHeightContent,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$WhoWeAre$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].boxContent,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$WhoWeAre$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].boxTitle,
                                        children: "Our Vision"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/public/home/WhoWeAre.tsx",
                                        lineNumber: 100,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$WhoWeAre$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].boxText,
                                        children: "Make private, secure cloud storage so good that people choose it over Google and Apple. Not because it's cheaper — because it's better and because their data belongs to them."
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/public/home/WhoWeAre.tsx",
                                        lineNumber: 103,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/public/home/WhoWeAre.tsx",
                                lineNumber: 99,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/public/home/WhoWeAre.tsx",
                            lineNumber: 98,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/public/home/WhoWeAre.tsx",
                        lineNumber: 92,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$WhoWeAre$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].contentBox, " ").concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$WhoWeAre$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].contentBoxSmall),
                        initial: {
                            opacity: 0,
                            y: 30
                        },
                        animate: isInView ? {
                            opacity: 1,
                            y: 0
                        } : {},
                        transition: {
                            delay: 0.5,
                            duration: 0.6
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$WhoWeAre$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].fullHeightContent,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$WhoWeAre$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].boxContent,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$WhoWeAre$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].boxTitle,
                                        children: "Our Goals"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/public/home/WhoWeAre.tsx",
                                        lineNumber: 119,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$WhoWeAre$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].boxText,
                                        children: "Zero-knowledge encryption by default. 99.9% uptime as the minimum, not the target. Infrastructure so reliable that our users never think about it."
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/public/home/WhoWeAre.tsx",
                                        lineNumber: 122,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/public/home/WhoWeAre.tsx",
                                lineNumber: 118,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/public/home/WhoWeAre.tsx",
                            lineNumber: 117,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/public/home/WhoWeAre.tsx",
                        lineNumber: 111,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/public/home/WhoWeAre.tsx",
                lineNumber: 16,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/public/home/WhoWeAre.tsx",
            lineNumber: 15,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/public/home/WhoWeAre.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
_s(WhoWeAre, "DljcBprJKYjULUac3YKdUV9OwZQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"]
    ];
});
_c = WhoWeAre;
var _c;
__turbopack_context__.k.register(_c, "WhoWeAre");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/public/home/GlobalPresence.module.scss [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "container": "GlobalPresence-module-scss-module__B1ZkPG__container",
  "header": "GlobalPresence-module-scss-module__B1ZkPG__header",
  "heading": "GlobalPresence-module-scss-module__B1ZkPG__heading",
  "highlight": "GlobalPresence-module-scss-module__B1ZkPG__highlight",
  "mapBg": "GlobalPresence-module-scss-module__B1ZkPG__mapBg",
  "mapContainer": "GlobalPresence-module-scss-module__B1ZkPG__mapContainer",
  "mapWrapper": "GlobalPresence-module-scss-module__B1ZkPG__mapWrapper",
  "pin": "GlobalPresence-module-scss-module__B1ZkPG__pin",
  "pinArrow": "GlobalPresence-module-scss-module__B1ZkPG__pinArrow",
  "pinArrowHQ": "GlobalPresence-module-scss-module__B1ZkPG__pinArrowHQ",
  "pinArrowServer": "GlobalPresence-module-scss-module__B1ZkPG__pinArrowServer",
  "pinDot": "GlobalPresence-module-scss-module__B1ZkPG__pinDot",
  "pinGroup": "GlobalPresence-module-scss-module__B1ZkPG__pinGroup",
  "pinLabel": "GlobalPresence-module-scss-module__B1ZkPG__pinLabel",
  "pinLabelHQ": "GlobalPresence-module-scss-module__B1ZkPG__pinLabelHQ",
  "pinLabelServer": "GlobalPresence-module-scss-module__B1ZkPG__pinLabelServer",
  "pinPulse": "GlobalPresence-module-scss-module__B1ZkPG__pinPulse",
  "readMore": "GlobalPresence-module-scss-module__B1ZkPG__readMore",
  "section": "GlobalPresence-module-scss-module__B1ZkPG__section",
  "subtitle": "GlobalPresence-module-scss-module__B1ZkPG__subtitle",
  "tooltip": "GlobalPresence-module-scss-module__B1ZkPG__tooltip",
  "tooltipInner": "GlobalPresence-module-scss-module__B1ZkPG__tooltipInner",
  "tooltipName": "GlobalPresence-module-scss-module__B1ZkPG__tooltipName",
  "tooltipType": "GlobalPresence-module-scss-module__B1ZkPG__tooltipType",
});
}),
"[project]/src/components/public/home/GlobalPresence.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GlobalPresence",
    ()=>GlobalPresence
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/use-in-view.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$GlobalPresence$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/public/home/GlobalPresence.module.scss [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function GlobalPresence() {
    _s();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const isInView = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"])(ref, {
        once: true,
        margin: '-100px'
    });
    const locations = [
        {
            name: 'Zurich',
            country: 'Switzerland',
            type: 'HQ',
            x: 50,
            y: 40
        },
        {
            name: 'Luxembourg',
            country: 'Luxembourg',
            type: 'Data Center',
            x: 48,
            y: 42
        },
        {
            name: 'Dallas',
            country: 'USA',
            type: 'Data Center',
            x: 25,
            y: 48
        },
        {
            name: 'Singapore',
            country: 'Singapore',
            type: 'Office',
            x: 75,
            y: 62
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        ref: ref,
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$GlobalPresence$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].section,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$GlobalPresence$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].container,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$GlobalPresence$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].header,
                    initial: {
                        opacity: 0,
                        y: 30
                    },
                    animate: isInView ? {
                        opacity: 1,
                        y: 0
                    } : {},
                    transition: {
                        duration: 0.8
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$GlobalPresence$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].heading,
                            children: [
                                "Built from the heart of Europe. Trusted",
                                ' ',
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$GlobalPresence$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].highlight,
                                    children: "worldwide."
                                }, void 0, false, {
                                    fileName: "[project]/src/components/public/home/GlobalPresence.tsx",
                                    lineNumber: 30,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/public/home/GlobalPresence.tsx",
                            lineNumber: 28,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            initial: {
                                opacity: 0
                            },
                            animate: isInView ? {
                                opacity: 1
                            } : {},
                            transition: {
                                delay: 0.3,
                                duration: 0.8
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/about",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$GlobalPresence$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].readMore,
                                children: [
                                    "Read More",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
                                        animate: {
                                            x: [
                                                0,
                                                5,
                                                0
                                            ]
                                        },
                                        transition: {
                                            duration: 1.5,
                                            repeat: Infinity
                                        },
                                        children: "→"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/public/home/GlobalPresence.tsx",
                                        lineNumber: 39,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/public/home/GlobalPresence.tsx",
                                lineNumber: 37,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/public/home/GlobalPresence.tsx",
                            lineNumber: 32,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/public/home/GlobalPresence.tsx",
                    lineNumber: 22,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$GlobalPresence$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].mapContainer,
                    initial: {
                        opacity: 0,
                        scale: 0.9
                    },
                    animate: isInView ? {
                        opacity: 1,
                        scale: 1
                    } : {},
                    transition: {
                        delay: 0.3,
                        duration: 0.8
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$GlobalPresence$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].mapWrapper,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$GlobalPresence$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].mapBg,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        viewBox: "0 0 1000 500",
                                        style: {
                                            width: '100%',
                                            height: '100%'
                                        },
                                        preserveAspectRatio: "xMidYMid meet",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pattern", {
                                                    id: "dots",
                                                    x: "0",
                                                    y: "0",
                                                    width: "8",
                                                    height: "8",
                                                    patternUnits: "userSpaceOnUse",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                        cx: "4",
                                                        cy: "4",
                                                        r: "1",
                                                        fill: "#ffffff"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/public/home/GlobalPresence.tsx",
                                                        lineNumber: 60,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/public/home/GlobalPresence.tsx",
                                                    lineNumber: 59,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/public/home/GlobalPresence.tsx",
                                                lineNumber: 58,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: "M 100 80 Q 150 60 200 80 L 220 100 Q 230 120 220 140 L 200 160 Q 180 180 150 180 L 120 170 Q 90 150 100 120 Z",
                                                fill: "url(#dots)"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/public/home/GlobalPresence.tsx",
                                                lineNumber: 63,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: "M 180 200 Q 200 190 220 200 L 230 250 Q 240 300 220 330 L 200 340 Q 180 330 170 310 L 160 260 Q 165 220 180 200 Z",
                                                fill: "url(#dots)"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/public/home/GlobalPresence.tsx",
                                                lineNumber: 64,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: "M 400 80 Q 440 70 480 85 L 500 100 Q 510 120 500 140 L 480 150 Q 450 160 420 150 L 395 130 Q 385 105 400 80 Z",
                                                fill: "url(#dots)"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/public/home/GlobalPresence.tsx",
                                                lineNumber: 65,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: "M 420 160 Q 460 150 500 165 L 520 200 Q 530 260 510 310 L 480 340 Q 450 350 430 340 L 410 310 Q 400 260 405 210 Z",
                                                fill: "url(#dots)"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/public/home/GlobalPresence.tsx",
                                                lineNumber: 66,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: "M 520 60 Q 600 50 680 70 L 750 90 Q 800 110 820 140 L 840 180 Q 850 220 830 250 L 800 270 Q 760 280 720 270 L 680 250 Q 640 230 600 210 L 560 180 Q 520 150 520 110 Z",
                                                fill: "url(#dots)"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/public/home/GlobalPresence.tsx",
                                                lineNumber: 67,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: "M 700 300 Q 740 290 780 300 L 800 320 Q 810 340 800 360 L 770 375 Q 740 380 710 370 L 690 350 Q 685 325 700 300 Z",
                                                fill: "url(#dots)"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/public/home/GlobalPresence.tsx",
                                                lineNumber: 68,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/public/home/GlobalPresence.tsx",
                                        lineNumber: 57,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/public/home/GlobalPresence.tsx",
                                    lineNumber: 56,
                                    columnNumber: 13
                                }, this),
                                locations.map((location, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$GlobalPresence$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].pin,
                                        style: {
                                            left: "".concat(location.x, "%"),
                                            top: "".concat(location.y, "%")
                                        },
                                        initial: {
                                            opacity: 0,
                                            scale: 0,
                                            y: -20
                                        },
                                        animate: isInView ? {
                                            opacity: 1,
                                            scale: 1,
                                            y: 0
                                        } : {},
                                        transition: {
                                            delay: 0.5 + index * 0.2,
                                            duration: 0.6
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$GlobalPresence$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].pinGroup,
                                            whileHover: {
                                                scale: 1.1
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                    className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$GlobalPresence$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].pinLabel, " ").concat(location.type === 'HQ' ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$GlobalPresence$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].pinLabelHQ : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$GlobalPresence$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].pinLabelServer),
                                                    animate: {
                                                        y: [
                                                            0,
                                                            -5,
                                                            0
                                                        ]
                                                    },
                                                    transition: {
                                                        duration: 2,
                                                        repeat: Infinity,
                                                        delay: index * 0.3
                                                    },
                                                    children: [
                                                        location.type === 'HQ' ? 'DATA CENTER' : 'ACCELERATING SERVERS',
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$GlobalPresence$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].pinArrow, " ").concat(location.type === 'HQ' ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$GlobalPresence$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].pinArrowHQ : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$GlobalPresence$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].pinArrowServer)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/public/home/GlobalPresence.tsx",
                                                            lineNumber: 88,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/public/home/GlobalPresence.tsx",
                                                    lineNumber: 82,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                    animate: {
                                                        scale: [
                                                            1,
                                                            1.2,
                                                            1
                                                        ]
                                                    },
                                                    transition: {
                                                        duration: 2,
                                                        repeat: Infinity,
                                                        delay: index * 0.3
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$GlobalPresence$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].pinDot
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/public/home/GlobalPresence.tsx",
                                                            lineNumber: 95,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$GlobalPresence$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].pinPulse,
                                                            animate: {
                                                                scale: [
                                                                    1,
                                                                    2,
                                                                    2
                                                                ],
                                                                opacity: [
                                                                    0.5,
                                                                    0,
                                                                    0
                                                                ]
                                                            },
                                                            transition: {
                                                                duration: 2,
                                                                repeat: Infinity,
                                                                delay: index * 0.3
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/public/home/GlobalPresence.tsx",
                                                            lineNumber: 96,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/public/home/GlobalPresence.tsx",
                                                    lineNumber: 91,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$GlobalPresence$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].tooltip,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$GlobalPresence$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].tooltipInner,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$GlobalPresence$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].tooltipName,
                                                                children: location.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/public/home/GlobalPresence.tsx",
                                                                lineNumber: 105,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$GlobalPresence$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].tooltipType,
                                                                children: location.type
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/public/home/GlobalPresence.tsx",
                                                                lineNumber: 106,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/public/home/GlobalPresence.tsx",
                                                        lineNumber: 104,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/public/home/GlobalPresence.tsx",
                                                    lineNumber: 103,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/public/home/GlobalPresence.tsx",
                                            lineNumber: 81,
                                            columnNumber: 17
                                        }, this)
                                    }, location.name, false, {
                                        fileName: "[project]/src/components/public/home/GlobalPresence.tsx",
                                        lineNumber: 73,
                                        columnNumber: 15
                                    }, this))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/public/home/GlobalPresence.tsx",
                            lineNumber: 55,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].p, {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$GlobalPresence$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].subtitle,
                            initial: {
                                opacity: 0
                            },
                            animate: isInView ? {
                                opacity: 1
                            } : {},
                            transition: {
                                delay: 1.5,
                                duration: 0.8
                            },
                            children: "Serving 24M+ users across 175+ countries from trusted global locations"
                        }, void 0, false, {
                            fileName: "[project]/src/components/public/home/GlobalPresence.tsx",
                            lineNumber: 114,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/public/home/GlobalPresence.tsx",
                    lineNumber: 49,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/public/home/GlobalPresence.tsx",
            lineNumber: 21,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/public/home/GlobalPresence.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
_s(GlobalPresence, "DljcBprJKYjULUac3YKdUV9OwZQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"]
    ];
});
_c = GlobalPresence;
var _c;
__turbopack_context__.k.register(_c, "GlobalPresence");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/public/home/WhyPCloud.module.scss [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "bgAccent": "WhyPCloud-module-scss-module__kII0PG__bgAccent",
  "card": "WhyPCloud-module-scss-module__kII0PG__card",
  "cardContent": "WhyPCloud-module-scss-module__kII0PG__cardContent",
  "cardDescription": "WhyPCloud-module-scss-module__kII0PG__cardDescription",
  "cardInner": "WhyPCloud-module-scss-module__kII0PG__cardInner",
  "cardTitle": "WhyPCloud-module-scss-module__kII0PG__cardTitle",
  "container": "WhyPCloud-module-scss-module__kII0PG__container",
  "grid": "WhyPCloud-module-scss-module__kII0PG__grid",
  "header": "WhyPCloud-module-scss-module__kII0PG__header",
  "heading": "WhyPCloud-module-scss-module__kII0PG__heading",
  "headingHighlight": "WhyPCloud-module-scss-module__kII0PG__headingHighlight",
  "iconWrapper": "WhyPCloud-module-scss-module__kII0PG__iconWrapper",
  "section": "WhyPCloud-module-scss-module__kII0PG__section",
});
}),
"[project]/src/components/public/home/WhyPCloud.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WhyPCloud",
    ()=>WhyPCloud
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/use-in-view.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/globe.js [app-client] (ecmascript) <export default as Globe>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Award$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/award.js [app-client] (ecmascript) <export default as Award>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/zap.js [app-client] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$WhyPCloud$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/public/home/WhyPCloud.module.scss [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function WhyPCloud() {
    _s();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const isInView = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"])(ref, {
        once: true,
        margin: '-100px'
    });
    const reasons = [
        {
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"],
            title: 'Top 1% Only',
            description: 'Compensation benchmarked to top tier. Culture and impact that drive excellence.',
            color: '#1EBCC5'
        },
        {
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__["Globe"],
            title: 'Global Impact',
            description: 'Trusted by 24M+ users. Operating in 175+ countries. Storing 500+ petabytes.',
            color: '#E6FF00'
        },
        {
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Award$3e$__["Award"],
            title: 'Swiss Quality',
            description: 'Zero-knowledge encryption. Swiss privacy standards. 99.92% uptime track record.',
            color: '#1EBCC5'
        },
        {
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"],
            title: 'Impact, Not Bureaucracy',
            description: 'We ship fast. You own your impact. Autonomy > process.',
            color: '#E6FF00'
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        ref: ref,
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$WhyPCloud$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].section,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$WhyPCloud$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].container,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$WhyPCloud$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].header,
                    initial: {
                        opacity: 0,
                        y: 30
                    },
                    animate: isInView ? {
                        opacity: 1,
                        y: 0
                    } : {},
                    transition: {
                        duration: 0.8
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$WhyPCloud$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].heading,
                        children: [
                            "Why the ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$WhyPCloud$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].headingHighlight,
                                children: "top 1%"
                            }, void 0, false, {
                                fileName: "[project]/src/components/public/home/WhyPCloud.tsx",
                                lineNumber: 49,
                                columnNumber: 21
                            }, this),
                            " choose pCloud"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/public/home/WhyPCloud.tsx",
                        lineNumber: 48,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/public/home/WhyPCloud.tsx",
                    lineNumber: 42,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$WhyPCloud$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].grid,
                    children: reasons.map((reason, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$WhyPCloud$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].card,
                            initial: {
                                opacity: 0,
                                y: 50
                            },
                            animate: isInView ? {
                                opacity: 1,
                                y: 0
                            } : {},
                            transition: {
                                delay: index * 0.15,
                                duration: 0.6
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$WhyPCloud$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardInner,
                                whileHover: {
                                    y: -10,
                                    transition: {
                                        duration: 0.3
                                    }
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$WhyPCloud$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].bgAccent,
                                        style: {
                                            backgroundColor: reason.color
                                        },
                                        animate: {
                                            scale: [
                                                1,
                                                1.2,
                                                1
                                            ],
                                            opacity: [
                                                0.2,
                                                0.3,
                                                0.2
                                            ]
                                        },
                                        transition: {
                                            duration: 3,
                                            repeat: Infinity,
                                            delay: index * 0.5
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/public/home/WhyPCloud.tsx",
                                        lineNumber: 66,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$WhyPCloud$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardContent,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$WhyPCloud$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].iconWrapper,
                                                style: {
                                                    backgroundColor: reason.color,
                                                    color: reason.color === '#E6FF00' ? '#05183f' : 'white'
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(reason.icon, {
                                                    size: 32
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/public/home/WhyPCloud.tsx",
                                                    lineNumber: 84,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/public/home/WhyPCloud.tsx",
                                                lineNumber: 77,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$WhyPCloud$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardTitle,
                                                children: reason.title
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/public/home/WhyPCloud.tsx",
                                                lineNumber: 86,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$WhyPCloud$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardDescription,
                                                children: reason.description
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/public/home/WhyPCloud.tsx",
                                                lineNumber: 87,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/public/home/WhyPCloud.tsx",
                                        lineNumber: 76,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/public/home/WhyPCloud.tsx",
                                lineNumber: 62,
                                columnNumber: 15
                            }, this)
                        }, reason.title, false, {
                            fileName: "[project]/src/components/public/home/WhyPCloud.tsx",
                            lineNumber: 55,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/components/public/home/WhyPCloud.tsx",
                    lineNumber: 53,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/public/home/WhyPCloud.tsx",
            lineNumber: 41,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/public/home/WhyPCloud.tsx",
        lineNumber: 40,
        columnNumber: 5
    }, this);
}
_s(WhyPCloud, "DljcBprJKYjULUac3YKdUV9OwZQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"]
    ];
});
_c = WhyPCloud;
var _c;
__turbopack_context__.k.register(_c, "WhyPCloud");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/public/home/EngineeringProof.module.scss [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "container": "EngineeringProof-module-scss-module__6p7A7q__container",
  "header": "EngineeringProof-module-scss-module__6p7A7q__header",
  "link": "EngineeringProof-module-scss-module__6p7A7q__link",
  "links": "EngineeringProof-module-scss-module__6p7A7q__links",
  "metricCard": "EngineeringProof-module-scss-module__6p7A7q__metricCard",
  "metricIcon": "EngineeringProof-module-scss-module__6p7A7q__metricIcon",
  "metricLabel": "EngineeringProof-module-scss-module__6p7A7q__metricLabel",
  "metricValue": "EngineeringProof-module-scss-module__6p7A7q__metricValue",
  "metricsGrid": "EngineeringProof-module-scss-module__6p7A7q__metricsGrid",
  "section": "EngineeringProof-module-scss-module__6p7A7q__section",
  "subtitle": "EngineeringProof-module-scss-module__6p7A7q__subtitle",
  "title": "EngineeringProof-module-scss-module__6p7A7q__title",
});
}),
"[project]/src/components/public/home/EngineeringProof.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EngineeringProof",
    ()=>EngineeringProof
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/use-in-view.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/zap.js [app-client] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield.js [app-client] (ecmascript) <export default as Shield>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wrench$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wrench$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/wrench.js [app-client] (ecmascript) <export default as Wrench>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$EngineeringProof$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/public/home/EngineeringProof.module.scss [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
const metrics = [
    {
        value: '200+',
        label: 'Deploys per day',
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"]
    },
    {
        value: '85%+',
        label: 'Test coverage on critical paths',
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__["Shield"]
    },
    {
        value: '20%',
        label: 'Sprint time for tech debt',
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wrench$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wrench$3e$__["Wrench"]
    },
    {
        value: '25',
        label: 'Max days from application to offer',
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"]
    }
];
function EngineeringProof() {
    _s();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const isInView = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"])(ref, {
        once: true,
        margin: '-100px'
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        ref: ref,
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$EngineeringProof$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].section,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$EngineeringProof$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].container,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$EngineeringProof$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].header,
                    initial: {
                        opacity: 0,
                        y: 30
                    },
                    animate: isInView ? {
                        opacity: 1,
                        y: 0
                    } : {},
                    transition: {
                        duration: 0.8
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$EngineeringProof$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].title,
                            children: "Engineering at scale"
                        }, void 0, false, {
                            fileName: "[project]/src/components/public/home/EngineeringProof.tsx",
                            lineNumber: 45,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$EngineeringProof$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].subtitle,
                            children: "The numbers behind our engineering culture"
                        }, void 0, false, {
                            fileName: "[project]/src/components/public/home/EngineeringProof.tsx",
                            lineNumber: 46,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/public/home/EngineeringProof.tsx",
                    lineNumber: 39,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$EngineeringProof$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].metricsGrid,
                    children: metrics.map((metric, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$EngineeringProof$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].metricCard,
                            initial: {
                                opacity: 0,
                                y: 40
                            },
                            animate: isInView ? {
                                opacity: 1,
                                y: 0
                            } : {},
                            transition: {
                                delay: index * 0.12,
                                duration: 0.6
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$EngineeringProof$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].metricIcon,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(metric.Icon, {
                                        size: 24
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/public/home/EngineeringProof.tsx",
                                        lineNumber: 61,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/public/home/EngineeringProof.tsx",
                                    lineNumber: 60,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$EngineeringProof$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].metricValue,
                                    children: metric.value
                                }, void 0, false, {
                                    fileName: "[project]/src/components/public/home/EngineeringProof.tsx",
                                    lineNumber: 63,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$EngineeringProof$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].metricLabel,
                                    children: metric.label
                                }, void 0, false, {
                                    fileName: "[project]/src/components/public/home/EngineeringProof.tsx",
                                    lineNumber: 64,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, metric.label, true, {
                            fileName: "[project]/src/components/public/home/EngineeringProof.tsx",
                            lineNumber: 53,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/components/public/home/EngineeringProof.tsx",
                    lineNumber: 51,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$EngineeringProof$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].links,
                    initial: {
                        opacity: 0
                    },
                    animate: isInView ? {
                        opacity: 1
                    } : {},
                    transition: {
                        delay: 0.6,
                        duration: 0.6
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: "https://github.com/pcloud",
                            target: "_blank",
                            rel: "noopener noreferrer",
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$EngineeringProof$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].link,
                            children: [
                                "View our GitHub ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                    size: 16
                                }, void 0, false, {
                                    fileName: "[project]/src/components/public/home/EngineeringProof.tsx",
                                    lineNumber: 81,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/public/home/EngineeringProof.tsx",
                            lineNumber: 75,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/blog",
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$EngineeringProof$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].link,
                            children: [
                                "Read our engineering blog ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                    size: 16
                                }, void 0, false, {
                                    fileName: "[project]/src/components/public/home/EngineeringProof.tsx",
                                    lineNumber: 84,
                                    columnNumber: 39
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/public/home/EngineeringProof.tsx",
                            lineNumber: 83,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/public/home/EngineeringProof.tsx",
                    lineNumber: 69,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/public/home/EngineeringProof.tsx",
            lineNumber: 38,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/public/home/EngineeringProof.tsx",
        lineNumber: 37,
        columnNumber: 5
    }, this);
}
_s(EngineeringProof, "DljcBprJKYjULUac3YKdUV9OwZQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"]
    ];
});
_c = EngineeringProof;
var _c;
__turbopack_context__.k.register(_c, "EngineeringProof");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/public/home/OpenRoles.module.scss [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "badgeNew": "OpenRoles-module-scss-module__1Ke3lq__badgeNew",
  "badgePriority": "OpenRoles-module-scss-module__1Ke3lq__badgePriority",
  "badges": "OpenRoles-module-scss-module__1Ke3lq__badges",
  "cardBg": "OpenRoles-module-scss-module__1Ke3lq__cardBg",
  "cardBottom": "OpenRoles-module-scss-module__1Ke3lq__cardBottom",
  "cardContent": "OpenRoles-module-scss-module__1Ke3lq__cardContent",
  "cardOverlay": "OpenRoles-module-scss-module__1Ke3lq__cardOverlay",
  "cardSeniority": "OpenRoles-module-scss-module__1Ke3lq__cardSeniority",
  "cardTags": "OpenRoles-module-scss-module__1Ke3lq__cardTags",
  "cardTitle": "OpenRoles-module-scss-module__1Ke3lq__cardTitle",
  "cardsGrid": "OpenRoles-module-scss-module__1Ke3lq__cardsGrid",
  "container": "OpenRoles-module-scss-module__1Ke3lq__container",
  "header": "OpenRoles-module-scss-module__1Ke3lq__header",
  "heading": "OpenRoles-module-scss-module__1Ke3lq__heading",
  "jobCard": "OpenRoles-module-scss-module__1Ke3lq__jobCard",
  "section": "OpenRoles-module-scss-module__1Ke3lq__section",
  "subtitle": "OpenRoles-module-scss-module__1Ke3lq__subtitle",
  "tagDept": "OpenRoles-module-scss-module__1Ke3lq__tagDept",
  "tagProduct": "OpenRoles-module-scss-module__1Ke3lq__tagProduct",
  "viewAll": "OpenRoles-module-scss-module__1Ke3lq__viewAll",
  "viewAllButton": "OpenRoles-module-scss-module__1Ke3lq__viewAllButton",
});
}),
"[project]/src/components/public/home/OpenRoles.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OpenRoles",
    ()=>OpenRoles
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/use-in-view.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$ImageWithFallback$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/public/ImageWithFallback.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$OpenRoles$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/public/home/OpenRoles.module.scss [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function OpenRoles(param) {
    let { jobs } = param;
    _s();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const isInView = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"])(ref, {
        once: true,
        margin: '-100px'
    });
    const displayJobs = jobs.slice(0, 3);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        ref: ref,
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$OpenRoles$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].section,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$OpenRoles$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].container,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$OpenRoles$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].header,
                    initial: {
                        opacity: 0,
                        y: 30
                    },
                    animate: isInView ? {
                        opacity: 1,
                        y: 0
                    } : {},
                    transition: {
                        duration: 0.6
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$OpenRoles$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].heading,
                            children: "Open Positions"
                        }, void 0, false, {
                            fileName: "[project]/src/components/public/home/OpenRoles.tsx",
                            lineNumber: 29,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$OpenRoles$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].subtitle,
                            children: "Browse our open positions to explore what roles exist, what skills are needed, and how to start your journey with pCloud."
                        }, void 0, false, {
                            fileName: "[project]/src/components/public/home/OpenRoles.tsx",
                            lineNumber: 30,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/public/home/OpenRoles.tsx",
                    lineNumber: 23,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$OpenRoles$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardsGrid,
                    children: displayJobs.map((job, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/careers/".concat(job.slug),
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$OpenRoles$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].jobCard,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                style: {
                                    height: '100%'
                                },
                                initial: {
                                    opacity: 0,
                                    y: 30
                                },
                                animate: isInView ? {
                                    opacity: 1,
                                    y: 0
                                } : {},
                                transition: {
                                    delay: 0.1 * (index + 1),
                                    duration: 0.6
                                },
                                whileHover: {
                                    y: -5,
                                    transition: {
                                        duration: 0.3
                                    }
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$OpenRoles$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardBg,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$ImageWithFallback$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ImageWithFallback"], {
                                            src: job.cover_image || 'https://images.unsplash.com/photo-1565229284535-2cbbe3049123?w=600',
                                            alt: job.title
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/public/home/OpenRoles.tsx",
                                            lineNumber: 47,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/public/home/OpenRoles.tsx",
                                        lineNumber: 46,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$OpenRoles$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardOverlay
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/public/home/OpenRoles.tsx",
                                        lineNumber: 52,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$OpenRoles$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardContent,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$OpenRoles$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].badges,
                                                children: [
                                                    job.is_new === 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$OpenRoles$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].badgeNew,
                                                        children: "NEW"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/public/home/OpenRoles.tsx",
                                                        lineNumber: 55,
                                                        columnNumber: 42
                                                    }, this),
                                                    job.is_high_priority === 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$OpenRoles$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].badgePriority,
                                                        children: "HIGH PRIORITY"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/public/home/OpenRoles.tsx",
                                                        lineNumber: 56,
                                                        columnNumber: 52
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/public/home/OpenRoles.tsx",
                                                lineNumber: 54,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$OpenRoles$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardBottom,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$OpenRoles$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardTitle,
                                                        children: job.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/public/home/OpenRoles.tsx",
                                                        lineNumber: 59,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$OpenRoles$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardSeniority,
                                                        children: job.seniority
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/public/home/OpenRoles.tsx",
                                                        lineNumber: 60,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$OpenRoles$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardTags,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$OpenRoles$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].tagDept,
                                                                children: job.department
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/public/home/OpenRoles.tsx",
                                                                lineNumber: 62,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$OpenRoles$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].tagProduct,
                                                                children: job.product
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/public/home/OpenRoles.tsx",
                                                                lineNumber: 63,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/public/home/OpenRoles.tsx",
                                                        lineNumber: 61,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/public/home/OpenRoles.tsx",
                                                lineNumber: 58,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/public/home/OpenRoles.tsx",
                                        lineNumber: 53,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/public/home/OpenRoles.tsx",
                                lineNumber: 39,
                                columnNumber: 15
                            }, this)
                        }, job.id, false, {
                            fileName: "[project]/src/components/public/home/OpenRoles.tsx",
                            lineNumber: 38,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/components/public/home/OpenRoles.tsx",
                    lineNumber: 36,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$OpenRoles$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].viewAll,
                    initial: {
                        opacity: 0,
                        y: 20
                    },
                    animate: isInView ? {
                        opacity: 1,
                        y: 0
                    } : {},
                    transition: {
                        delay: 0.5,
                        duration: 0.6
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/careers",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$OpenRoles$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].viewAllButton,
                            whileHover: {
                                scale: 1.05
                            },
                            whileTap: {
                                scale: 0.95
                            },
                            children: [
                                "View All (",
                                jobs.length,
                                ")"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/public/home/OpenRoles.tsx",
                            lineNumber: 79,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/public/home/OpenRoles.tsx",
                        lineNumber: 78,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/public/home/OpenRoles.tsx",
                    lineNumber: 72,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/public/home/OpenRoles.tsx",
            lineNumber: 22,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/public/home/OpenRoles.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
_s(OpenRoles, "DljcBprJKYjULUac3YKdUV9OwZQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"]
    ];
});
_c = OpenRoles;
var _c;
__turbopack_context__.k.register(_c, "OpenRoles");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/public/home/EmployeeSpotlight.module.scss [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "carousel": "EmployeeSpotlight-module-scss-module__ZDG2oG__carousel",
  "carouselTrack": "EmployeeSpotlight-module-scss-module__ZDG2oG__carouselTrack",
  "container": "EmployeeSpotlight-module-scss-module__ZDG2oG__container",
  "header": "EmployeeSpotlight-module-scss-module__ZDG2oG__header",
  "heading": "EmployeeSpotlight-module-scss-module__ZDG2oG__heading",
  "headingHighlight": "EmployeeSpotlight-module-scss-module__ZDG2oG__headingHighlight",
  "indicator": "EmployeeSpotlight-module-scss-module__ZDG2oG__indicator",
  "indicatorActive": "EmployeeSpotlight-module-scss-module__ZDG2oG__indicatorActive",
  "indicators": "EmployeeSpotlight-module-scss-module__ZDG2oG__indicators",
  "name": "EmployeeSpotlight-module-scss-module__ZDG2oG__name",
  "navButton": "EmployeeSpotlight-module-scss-module__ZDG2oG__navButton",
  "navButtons": "EmployeeSpotlight-module-scss-module__ZDG2oG__navButtons",
  "photoWrapper": "EmployeeSpotlight-module-scss-module__ZDG2oG__photoWrapper",
  "quote": "EmployeeSpotlight-module-scss-module__ZDG2oG__quote",
  "role": "EmployeeSpotlight-module-scss-module__ZDG2oG__role",
  "section": "EmployeeSpotlight-module-scss-module__ZDG2oG__section",
  "slide": "EmployeeSpotlight-module-scss-module__ZDG2oG__slide",
  "slideInner": "EmployeeSpotlight-module-scss-module__ZDG2oG__slideInner",
  "storyLink": "EmployeeSpotlight-module-scss-module__ZDG2oG__storyLink",
});
}),
"[project]/src/components/public/home/EmployeeSpotlight.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EmployeeSpotlight",
    ()=>EmployeeSpotlight
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/use-in-view.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$ImageWithFallback$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/public/ImageWithFallback.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$EmployeeSpotlight$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/public/home/EmployeeSpotlight.module.scss [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
const employees = [
    {
        name: 'Sarah Chen',
        role: 'Senior Security Engineer',
        photo: 'https://images.unsplash.com/photo-1573497701119-52dbe8832c17?w=600',
        quote: "At pCloud, I get to work on cutting-edge encryption technology that protects millions of users. The team trusts me to make important decisions, and I have the autonomy to innovate."
    },
    {
        name: 'Marcus Johnson',
        role: 'Principal Backend Engineer',
        photo: 'https://images.unsplash.com/photo-1769636930047-4478f12cf430?w=600',
        quote: 'Building infrastructure that stores 500+ petabytes of data across 175+ countries is incredibly challenging and rewarding. What I love most is the engineering culture.'
    },
    {
        name: 'Yuki Tanaka',
        role: 'Product Designer',
        photo: 'https://images.unsplash.com/photo-1770363758469-386b78e979e2?w=600',
        quote: "What drew me to pCloud was the mission: making privacy accessible to everyone. As a designer, I appreciate how the team values user experience as much as security."
    }
];
function EmployeeSpotlight() {
    _s();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const isInView = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"])(ref, {
        once: true,
        margin: '-100px'
    });
    const [currentSlide, setCurrentSlide] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const nextSlide = ()=>setCurrentSlide((prev)=>(prev + 1) % employees.length);
    const prevSlide = ()=>setCurrentSlide((prev)=>(prev - 1 + employees.length) % employees.length);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        ref: ref,
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$EmployeeSpotlight$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].section,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$EmployeeSpotlight$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].container,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$EmployeeSpotlight$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].header,
                    initial: {
                        opacity: 0,
                        y: 30
                    },
                    animate: isInView ? {
                        opacity: 1,
                        y: 0
                    } : {},
                    transition: {
                        duration: 0.8
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$EmployeeSpotlight$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].heading,
                        children: [
                            "The people building ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$EmployeeSpotlight$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].headingHighlight,
                                children: "pCloud"
                            }, void 0, false, {
                                fileName: "[project]/src/components/public/home/EmployeeSpotlight.tsx",
                                lineNumber: 47,
                                columnNumber: 33
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/public/home/EmployeeSpotlight.tsx",
                        lineNumber: 46,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/public/home/EmployeeSpotlight.tsx",
                    lineNumber: 40,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$EmployeeSpotlight$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].carousel,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$EmployeeSpotlight$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].carouselTrack,
                            animate: {
                                x: "-".concat(currentSlide * 100, "%")
                            },
                            transition: {
                                type: 'spring',
                                stiffness: 300,
                                damping: 30
                            },
                            children: employees.map((employee)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$EmployeeSpotlight$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].slide,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$EmployeeSpotlight$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].slideInner,
                                        initial: {
                                            opacity: 0,
                                            scale: 0.9
                                        },
                                        animate: isInView ? {
                                            opacity: 1,
                                            scale: 1
                                        } : {},
                                        transition: {
                                            delay: 0.3,
                                            duration: 0.6
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$EmployeeSpotlight$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].photoWrapper,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$ImageWithFallback$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ImageWithFallback"], {
                                                    src: employee.photo,
                                                    alt: employee.name
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/public/home/EmployeeSpotlight.tsx",
                                                    lineNumber: 66,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/public/home/EmployeeSpotlight.tsx",
                                                lineNumber: 65,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$EmployeeSpotlight$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].quote,
                                                        children: [
                                                            "“",
                                                            employee.quote,
                                                            "”"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/public/home/EmployeeSpotlight.tsx",
                                                        lineNumber: 69,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$EmployeeSpotlight$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].name,
                                                                children: employee.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/public/home/EmployeeSpotlight.tsx",
                                                                lineNumber: 71,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$EmployeeSpotlight$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].role,
                                                                children: employee.role
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/public/home/EmployeeSpotlight.tsx",
                                                                lineNumber: 72,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/public/home/EmployeeSpotlight.tsx",
                                                        lineNumber: 70,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: "/life",
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$EmployeeSpotlight$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].storyLink,
                                                        children: "Read story"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/public/home/EmployeeSpotlight.tsx",
                                                        lineNumber: 74,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/public/home/EmployeeSpotlight.tsx",
                                                lineNumber: 68,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/public/home/EmployeeSpotlight.tsx",
                                        lineNumber: 59,
                                        columnNumber: 17
                                    }, this)
                                }, employee.name, false, {
                                    fileName: "[project]/src/components/public/home/EmployeeSpotlight.tsx",
                                    lineNumber: 58,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/public/home/EmployeeSpotlight.tsx",
                            lineNumber: 52,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$EmployeeSpotlight$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navButtons,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                    onClick: prevSlide,
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$EmployeeSpotlight$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navButton,
                                    whileHover: {
                                        scale: 1.1
                                    },
                                    whileTap: {
                                        scale: 0.9
                                    },
                                    children: "←"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/public/home/EmployeeSpotlight.tsx",
                                    lineNumber: 84,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                    onClick: nextSlide,
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$EmployeeSpotlight$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].navButton,
                                    whileHover: {
                                        scale: 1.1
                                    },
                                    whileTap: {
                                        scale: 0.9
                                    },
                                    children: "→"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/public/home/EmployeeSpotlight.tsx",
                                    lineNumber: 87,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/public/home/EmployeeSpotlight.tsx",
                            lineNumber: 83,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$EmployeeSpotlight$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].indicators,
                            children: employees.map((_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setCurrentSlide(index),
                                    className: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$EmployeeSpotlight$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].indicator, " ").concat(currentSlide === index ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$EmployeeSpotlight$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].indicatorActive : '')
                                }, index, false, {
                                    fileName: "[project]/src/components/public/home/EmployeeSpotlight.tsx",
                                    lineNumber: 94,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/public/home/EmployeeSpotlight.tsx",
                            lineNumber: 92,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/public/home/EmployeeSpotlight.tsx",
                    lineNumber: 51,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/public/home/EmployeeSpotlight.tsx",
            lineNumber: 39,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/public/home/EmployeeSpotlight.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
_s(EmployeeSpotlight, "t2aRckYhegHz7GTeQdXodFPixBQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"]
    ];
});
_c = EmployeeSpotlight;
var _c;
__turbopack_context__.k.register(_c, "EmployeeSpotlight");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/public/home/BlogTeaser.module.scss [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "card": "BlogTeaser-module-scss-module__SRjaLW__card",
  "cardBody": "BlogTeaser-module-scss-module__SRjaLW__cardBody",
  "cardImage": "BlogTeaser-module-scss-module__SRjaLW__cardImage",
  "cardMeta": "BlogTeaser-module-scss-module__SRjaLW__cardMeta",
  "cardTitle": "BlogTeaser-module-scss-module__SRjaLW__cardTitle",
  "categoryPill": "BlogTeaser-module-scss-module__SRjaLW__categoryPill",
  "container": "BlogTeaser-module-scss-module__SRjaLW__container",
  "cta": "BlogTeaser-module-scss-module__SRjaLW__cta",
  "ctaButton": "BlogTeaser-module-scss-module__SRjaLW__ctaButton",
  "grid": "BlogTeaser-module-scss-module__SRjaLW__grid",
  "header": "BlogTeaser-module-scss-module__SRjaLW__header",
  "heading": "BlogTeaser-module-scss-module__SRjaLW__heading",
  "headingHighlight": "BlogTeaser-module-scss-module__SRjaLW__headingHighlight",
  "readMore": "BlogTeaser-module-scss-module__SRjaLW__readMore",
  "readTime": "BlogTeaser-module-scss-module__SRjaLW__readTime",
  "section": "BlogTeaser-module-scss-module__SRjaLW__section",
});
}),
"[project]/src/components/public/home/BlogTeaser.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BlogTeaser",
    ()=>BlogTeaser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/use-in-view.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$ImageWithFallback$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/public/ImageWithFallback.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$BlogTeaser$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/public/home/BlogTeaser.module.scss [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
function BlogTeaser(param) {
    let { posts } = param;
    _s();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const isInView = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"])(ref, {
        once: true,
        margin: '-100px'
    });
    const displayPosts = posts.slice(0, 3);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        ref: ref,
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$BlogTeaser$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].section,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$BlogTeaser$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].container,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$BlogTeaser$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].header,
                    initial: {
                        opacity: 0,
                        y: 30
                    },
                    animate: isInView ? {
                        opacity: 1,
                        y: 0
                    } : {},
                    transition: {
                        duration: 0.8
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$BlogTeaser$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].heading,
                        children: [
                            "From the ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$BlogTeaser$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].headingHighlight,
                                children: "engineering blog"
                            }, void 0, false, {
                                fileName: "[project]/src/components/public/home/BlogTeaser.tsx",
                                lineNumber: 31,
                                columnNumber: 22
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/public/home/BlogTeaser.tsx",
                        lineNumber: 30,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/public/home/BlogTeaser.tsx",
                    lineNumber: 24,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$BlogTeaser$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].grid,
                    children: displayPosts.map((post, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/blog/".concat(post.slug),
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$BlogTeaser$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].card,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].article, {
                                initial: {
                                    opacity: 0,
                                    y: 50
                                },
                                animate: isInView ? {
                                    opacity: 1,
                                    y: 0
                                } : {},
                                transition: {
                                    delay: index * 0.2,
                                    duration: 0.6
                                },
                                whileHover: {
                                    y: -10,
                                    transition: {
                                        duration: 0.3
                                    }
                                },
                                style: {
                                    height: '100%'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$BlogTeaser$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardImage,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$ImageWithFallback$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ImageWithFallback"], {
                                                src: post.cover_image || 'https://images.unsplash.com/photo-1695668548342-c0c1ad479aee?w=600',
                                                alt: post.title
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/public/home/BlogTeaser.tsx",
                                                lineNumber: 46,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$BlogTeaser$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].categoryPill,
                                                style: {
                                                    backgroundColor: '#1EBCC5',
                                                    color: 'white'
                                                },
                                                children: post.category
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/public/home/BlogTeaser.tsx",
                                                lineNumber: 50,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/public/home/BlogTeaser.tsx",
                                        lineNumber: 45,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$BlogTeaser$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardBody,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$BlogTeaser$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardTitle,
                                                children: post.title
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/public/home/BlogTeaser.tsx",
                                                lineNumber: 62,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$BlogTeaser$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardMeta,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: post.author
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/public/home/BlogTeaser.tsx",
                                                        lineNumber: 64,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$BlogTeaser$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].readTime,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                                size: 14
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/public/home/BlogTeaser.tsx",
                                                                lineNumber: 66,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: post.read_time || '5 min'
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/public/home/BlogTeaser.tsx",
                                                                lineNumber: 67,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/public/home/BlogTeaser.tsx",
                                                        lineNumber: 65,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/public/home/BlogTeaser.tsx",
                                                lineNumber: 63,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$BlogTeaser$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].readMore,
                                                children: "Read Article"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/public/home/BlogTeaser.tsx",
                                                lineNumber: 70,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/public/home/BlogTeaser.tsx",
                                        lineNumber: 61,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/public/home/BlogTeaser.tsx",
                                lineNumber: 38,
                                columnNumber: 15
                            }, this)
                        }, post.id, false, {
                            fileName: "[project]/src/components/public/home/BlogTeaser.tsx",
                            lineNumber: 37,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/components/public/home/BlogTeaser.tsx",
                    lineNumber: 35,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$BlogTeaser$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cta,
                    initial: {
                        opacity: 0,
                        y: 20
                    },
                    animate: isInView ? {
                        opacity: 1,
                        y: 0
                    } : {},
                    transition: {
                        delay: 0.8,
                        duration: 0.6
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/blog",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$home$2f$BlogTeaser$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].ctaButton,
                            whileHover: {
                                scale: 1.05
                            },
                            whileTap: {
                                scale: 0.95
                            },
                            children: "All Posts"
                        }, void 0, false, {
                            fileName: "[project]/src/components/public/home/BlogTeaser.tsx",
                            lineNumber: 86,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/public/home/BlogTeaser.tsx",
                        lineNumber: 85,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/public/home/BlogTeaser.tsx",
                    lineNumber: 79,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/public/home/BlogTeaser.tsx",
            lineNumber: 23,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/public/home/BlogTeaser.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
}
_s(BlogTeaser, "DljcBprJKYjULUac3YKdUV9OwZQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"]
    ];
});
_c = BlogTeaser;
var _c;
__turbopack_context__.k.register(_c, "BlogTeaser");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/public/TalentCommunity.module.scss [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "actions": "TalentCommunity-module-scss-module__T4e0qq__actions",
  "bgPattern": "TalentCommunity-module-scss-module__T4e0qq__bgPattern",
  "charCount": "TalentCommunity-module-scss-module__T4e0qq__charCount",
  "checkbox": "TalentCommunity-module-scss-module__T4e0qq__checkbox",
  "consent": "TalentCommunity-module-scss-module__T4e0qq__consent",
  "consentText": "TalentCommunity-module-scss-module__T4e0qq__consentText",
  "container": "TalentCommunity-module-scss-module__T4e0qq__container",
  "error": "TalentCommunity-module-scss-module__T4e0qq__error",
  "fieldGroup": "TalentCommunity-module-scss-module__T4e0qq__fieldGroup",
  "form": "TalentCommunity-module-scss-module__T4e0qq__form",
  "header": "TalentCommunity-module-scss-module__T4e0qq__header",
  "highlight": "TalentCommunity-module-scss-module__T4e0qq__highlight",
  "input": "TalentCommunity-module-scss-module__T4e0qq__input",
  "section": "TalentCommunity-module-scss-module__T4e0qq__section",
  "submitBtn": "TalentCommunity-module-scss-module__T4e0qq__submitBtn",
  "subtitle": "TalentCommunity-module-scss-module__T4e0qq__subtitle",
  "success": "TalentCommunity-module-scss-module__T4e0qq__success",
  "successIcon": "TalentCommunity-module-scss-module__T4e0qq__successIcon",
  "textarea": "TalentCommunity-module-scss-module__T4e0qq__textarea",
  "title": "TalentCommunity-module-scss-module__T4e0qq__title",
});
}),
"[project]/src/components/public/TalentCommunity.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TalentCommunity",
    ()=>TalentCommunity
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/use-in-view.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$TalentCommunity$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/components/public/TalentCommunity.module.scss [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function TalentCommunity() {
    _s();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const isInView = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"])(ref, {
        once: true,
        margin: '-100px'
    });
    const [pcloudLink, setPcloudLink] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [message, setMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [privacyConsent, setPrivacyConsent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [submitted, setSubmitted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [submitting, setSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [formError, setFormError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (!privacyConsent || !pcloudLink) return;
        setSubmitting(true);
        setFormError('');
        try {
            const res = await fetch('/api/candidates', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    full_name: 'General Application',
                    email: pcloudLink,
                    cover_message: message,
                    source: 'Direct',
                    portfolio_url: pcloudLink
                })
            });
            const data = await res.json();
            if (data.success) {
                setSubmitted(true);
                setTimeout(()=>{
                    setPcloudLink('');
                    setMessage('');
                    setPrivacyConsent(false);
                    setSubmitted(false);
                }, 5000);
            } else {
                setFormError(data.error || 'Something went wrong. Please try again.');
            }
        } catch (e) {
            setFormError('Network error. Please try again.');
        } finally{
            setSubmitting(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        ref: ref,
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$TalentCommunity$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].section,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$TalentCommunity$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].bgPattern
            }, void 0, false, {
                fileName: "[project]/src/components/public/TalentCommunity.tsx",
                lineNumber: 58,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$TalentCommunity$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].container,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$TalentCommunity$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].header,
                        initial: {
                            opacity: 0,
                            y: 30
                        },
                        animate: isInView ? {
                            opacity: 1,
                            y: 0
                        } : {},
                        transition: {
                            duration: 0.8
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$TalentCommunity$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].title,
                                children: [
                                    "Don't see what you're",
                                    ' ',
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$TalentCommunity$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].highlight,
                                        children: "looking for"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/public/TalentCommunity.tsx",
                                        lineNumber: 68,
                                        columnNumber: 13
                                    }, this),
                                    "?"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/public/TalentCommunity.tsx",
                                lineNumber: 66,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$TalentCommunity$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].subtitle,
                                children: "Just send your details and CV."
                            }, void 0, false, {
                                fileName: "[project]/src/components/public/TalentCommunity.tsx",
                                lineNumber: 70,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/public/TalentCommunity.tsx",
                        lineNumber: 60,
                        columnNumber: 9
                    }, this),
                    !submitted ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].form, {
                        onSubmit: handleSubmit,
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$TalentCommunity$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].form,
                        initial: {
                            opacity: 0,
                            y: 30
                        },
                        animate: isInView ? {
                            opacity: 1,
                            y: 0
                        } : {},
                        transition: {
                            delay: 0.3,
                            duration: 0.8
                        },
                        children: [
                            formError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$TalentCommunity$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].error,
                                children: formError
                            }, void 0, false, {
                                fileName: "[project]/src/components/public/TalentCommunity.tsx",
                                lineNumber: 84,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$TalentCommunity$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].fieldGroup,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "url",
                                    placeholder: "Shared Link in pCloud (paste your CV link) *",
                                    value: pcloudLink,
                                    onChange: (e)=>setPcloudLink(e.target.value),
                                    required: true,
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$TalentCommunity$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].input
                                }, void 0, false, {
                                    fileName: "[project]/src/components/public/TalentCommunity.tsx",
                                    lineNumber: 88,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/public/TalentCommunity.tsx",
                                lineNumber: 87,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$TalentCommunity$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].fieldGroup,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        placeholder: "Tell us about yourself, your experience, and what you're looking for... (optional)",
                                        value: message,
                                        onChange: (e)=>setMessage(e.target.value.slice(0, 1000)),
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$TalentCommunity$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].textarea,
                                        rows: 4
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/public/TalentCommunity.tsx",
                                        lineNumber: 99,
                                        columnNumber: 15
                                    }, this),
                                    message.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$TalentCommunity$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].charCount,
                                        children: [
                                            message.length,
                                            "/1000"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/public/TalentCommunity.tsx",
                                        lineNumber: 107,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/public/TalentCommunity.tsx",
                                lineNumber: 98,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$TalentCommunity$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].actions,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$TalentCommunity$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].consent,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "checkbox",
                                                checked: privacyConsent,
                                                onChange: (e)=>setPrivacyConsent(e.target.checked),
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$TalentCommunity$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].checkbox
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/public/TalentCommunity.tsx",
                                                lineNumber: 113,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$TalentCommunity$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].consentText,
                                                children: [
                                                    "I have read and agree to the",
                                                    ' ',
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        href: "/legal/privacy-policy",
                                                        children: "Privacy Policy"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/public/TalentCommunity.tsx",
                                                        lineNumber: 121,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/public/TalentCommunity.tsx",
                                                lineNumber: 119,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/public/TalentCommunity.tsx",
                                        lineNumber: 112,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                        type: "submit",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$TalentCommunity$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].submitBtn,
                                        whileHover: {
                                            scale: 1.05
                                        },
                                        whileTap: {
                                            scale: 0.95
                                        },
                                        disabled: submitting || !privacyConsent,
                                        children: submitting ? 'Sending...' : 'Send Application'
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/public/TalentCommunity.tsx",
                                        lineNumber: 125,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/public/TalentCommunity.tsx",
                                lineNumber: 111,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/public/TalentCommunity.tsx",
                        lineNumber: 76,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$TalentCommunity$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].success,
                        initial: {
                            opacity: 0,
                            scale: 0.8
                        },
                        animate: {
                            opacity: 1,
                            scale: 1
                        },
                        transition: {
                            type: 'spring',
                            duration: 0.6
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$TalentCommunity$2e$module$2e$scss__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].successIcon,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24",
                                    width: 40,
                                    height: 40,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 3,
                                        d: "M5 13l4 4L19 7"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/public/TalentCommunity.tsx",
                                        lineNumber: 145,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/public/TalentCommunity.tsx",
                                    lineNumber: 144,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/public/TalentCommunity.tsx",
                                lineNumber: 143,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                children: "Application Sent!"
                            }, void 0, false, {
                                fileName: "[project]/src/components/public/TalentCommunity.tsx",
                                lineNumber: 148,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "Thank you. We'll review your details and get back to you."
                            }, void 0, false, {
                                fileName: "[project]/src/components/public/TalentCommunity.tsx",
                                lineNumber: 149,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/public/TalentCommunity.tsx",
                        lineNumber: 137,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/public/TalentCommunity.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/public/TalentCommunity.tsx",
        lineNumber: 57,
        columnNumber: 5
    }, this);
}
_s(TalentCommunity, "C8HI2tOEKWX9Nn9gjJBVCX604vs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"]
    ];
});
_c = TalentCommunity;
var _c;
__turbopack_context__.k.register(_c, "TalentCommunity");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_components_public_3c908af6._.js.map