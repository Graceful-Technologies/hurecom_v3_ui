import Aura from '@primeuix/themes/aura';
import { definePreset } from '@primeuix/themes';

const hurecomPrimary = {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#2563eb',
    600: '#1d4ed8',
    700: '#1e40af',
    800: '#1e3a8a',
    900: '#172554',
    950: '#0f172a'
};

const slate = {
    0: '#ffffff',
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    950: '#020617'
};

export const HurecomPreset = definePreset(Aura, {
    semantic: {
        primary: hurecomPrimary,

        transitionDuration: '150ms',

        colorScheme: {
            light: {
                surface: slate,

                primary: {
                    color: '{primary.500}',
                    contrastColor: '#ffffff',
                    hoverColor: '{primary.600}',
                    activeColor: '{primary.700}'
                },

                highlight: {
                    background: '{primary.50}',
                    focusBackground: '{primary.100}',
                    color: '{primary.700}',
                    focusColor: '{primary.800}'
                },

                formField: {
                    background: '#ffffff',
                    disabledBackground: '{surface.100}',
                    borderColor: '{surface.200}',
                    hoverBorderColor: '{surface.300}',
                    focusBorderColor: '{primary.500}',
                    color: '{surface.900}',
                    placeholderColor: '{surface.500}',

                    paddingX: '0.75rem',
                    paddingY: '0.625rem',

                    borderRadius: '8px'
                },

                text: {
                    color: '{surface.800}',
                    hoverColor: '{surface.900}',
                    mutedColor: '{surface.500}',
                    hoverMutedColor: '{surface.600}'
                },

                content: {
                    background: '#ffffff',
                    hoverBackground: '{surface.50}',
                    borderColor: '{surface.200}',
                    color: '{text.color}',
                    hoverColor: '{text.hover.color}'
                },

                overlay: {
                    select: {
                        background: '#ffffff',
                        borderColor: '{surface.200}',
                        color: '{text.color}'
                    },

                    popover: {
                        background: '#ffffff',
                        borderColor: '{surface.200}',
                        color: '{text.color}'
                    },

                    modal: {
                        background: '#ffffff',
                        borderColor: '{surface.200}',
                        color: '{text.color}'
                    }
                },

                list: {
                    option: {
                        focusBackground: '{surface.50}',
                        selectedBackground: '{primary.50}',
                        selectedFocusBackground: '{primary.100}',
                        color: '{text.color}',
                        selectedColor: '{primary.700}'
                    }
                },

                navigation: {
                    item: {
                        focusBackground: '{surface.100}',
                        activeBackground: '{primary.50}',
                        color: '{text.color}',
                        activeColor: '{primary.700}'
                    }
                },

                tabs: {
                    root: {
                        transitionDuration: '{transition.duration}'
                    },

                    tablist: {
                        background: '#ffffff',
                        borderWidth: '0 0 1px 0',
                        borderColor: '{surface.200}'
                    },

                    tab: {
                        background: 'transparent',
                        borderWidth: '0 0 2px 0',
                        borderColor: 'transparent',

                        color: '{text.muted.color}',

                        padding: '0.75rem 1rem',

                        fontWeight: '500',

                        transitionDuration: '{transition.duration}',

                        hoverBackground: '{surface.50}',
                        hoverBorderColor: '{primary.200}',
                        hoverColor: '{text.color}',

                        activeBorderColor: '{primary.500}',
                        activeColor: '{primary.700}'
                    },

                    tabpanel: {
                        background: '#ffffff',
                        padding: '1.5rem 0 1.125rem 0'
                    },

                    activeBar: {
                        height: '0'
                    }
                },

                datatable: {
                    headerCell: {
                        color: '{surface.500}',
                        background: '{surface.50}',
                        borderColor: '{surface.200}',
                        fontWeight: '600'
                    },

                    row: {
                        color: '{surface.800}',
                        background: '#ffffff'
                    },

                    bodyCell: {
                        borderColor: '{surface.100}'
                    }
                },

                chip: {
                    background: '{primary.50}',
                    color: '{primary.700}',
                    borderRadius: '6px',
                    paddingX: '0.625rem',
                    paddingY: '0.2rem',

                    remove: {
                        icon: {
                            color: '{primary.700}'
                        }
                    }
                },

                dialog: {
                    title: {
                        fontSize: '1.125rem',
                        fontWeight: '600'
                    },

                    content: {
                        padding: '0 1.5rem 1.5rem 1.5rem'
                    }
                },

                button: {
                    borderRadius: '8px'
                }
            },

            dark: {
                surface: slate,

                primary: {
                    color: '{primary.400}',
                    contrastColor: '{surface.900}',
                    hoverColor: '{primary.300}',
                    activeColor: '{primary.200}'
                },

                highlight: {
                    background: 'color-mix(in srgb, {primary.400}, transparent 84%)',
                    focusBackground: 'color-mix(in srgb, {primary.400}, transparent 76%)',
                    color: 'rgba(255,255,255,.92)',
                    focusColor: 'rgba(255,255,255,.92)'
                },

                formField: {
                    background: '{surface.900}',
                    disabledBackground: '{surface.800}',
                    borderColor: '{surface.700}',
                    hoverBorderColor: '{surface.600}',
                    focusBorderColor: '{primary.400}',
                    color: '{surface.0}',
                    placeholderColor: '{surface.400}'
                },

                text: {
                    color: '{surface.0}',
                    hoverColor: '{surface.0}',
                    mutedColor: '{surface.400}',
                    hoverMutedColor: '{surface.300}'
                },

                content: {
                    background: '{surface.900}',
                    hoverBackground: '{surface.800}',
                    borderColor: '{surface.700}',
                    color: '{text.color}'
                },

                overlay: {
                    select: {
                        background: '{surface.900}',
                        borderColor: '{surface.700}',
                        color: '{text.color}'
                    },

                    popover: {
                        background: '{surface.900}',
                        borderColor: '{surface.700}',
                        color: '{text.color}'
                    },

                    modal: {
                        background: '{surface.900}',
                        borderColor: '{surface.700}',
                        color: '{text.color}'
                    }
                },

                list: {
                    option: {
                        focusBackground: '{surface.800}',
                        selectedBackground: 'color-mix(in srgb, {primary.400}, transparent 84%)',
                        selectedFocusBackground: 'color-mix(in srgb, {primary.400}, transparent 76%)',
                        color: '{text.color}',
                        selectedColor: '#ffffff'
                    }
                },

                navigation: {
                    item: {
                        focusBackground: '{surface.800}',
                        activeBackground: 'color-mix(in srgb, {primary.400}, transparent 88%)',
                        color: '{text.color}',
                        activeColor: '#ffffff'
                    }
                },

                tabs: {
                    tablist: {
                        background: '{surface.900}',
                        borderColor: '{surface.700}'
                    },

                    tab: {
                        color: '{surface.400}',
                        hoverBackground: '{surface.800}',
                        hoverColor: '{surface.100}',
                        activeColor: '{primary.300}',
                        activeBorderColor: '{primary.400}'
                    },

                    tabpanel: {
                        background: '{surface.900}'
                    }
                },

                datatable: {
                    headerCell: {
                        color: '{surface.400}',
                        background: '{surface.800}',
                        borderColor: '{surface.700}'
                    },

                    row: {
                        color: '{surface.100}',
                        background: '{surface.900}'
                    },

                    bodyCell: {
                        borderColor: '{surface.800}'
                    }
                },

                dialog: {
                    title: {
                        fontSize: '1.125rem',
                        fontWeight: '600'
                    }
                }
            }
        }
    }
});