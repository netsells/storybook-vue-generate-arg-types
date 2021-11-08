const controls = {
    [Date]: 'date',
    [Boolean]: 'boolean',
    [String]: 'text',
    [Array]: 'object',
    [Object]: 'object',
    [Number]: 'number',
};

/**
 * Generate the arg types based on the component and recursive mixins.
 *
 * @param {object} component
 * @param {object} overrides
 *
 * @returns {object}
 */
export default function generateArgTypes(component, overrides = {}) {
    function getControl(options) {
        let type;

        if (!Array.isArray(options.type)) {
            type = options.type;
        }

        switch (typeof options.default) {
            case 'number':
                type = Number;
                break;
        }

        if (Array.isArray(options.type) && !type) {
            type = options.type[0];
        }

        return controls[type]
    }

    function getArgs(component, args = {}) {
        args = {
            ...component.mixins
                ? component.mixins.reduce((args, mixin) => ({
                    ...args,
                    ...getArgs(mixin, args)
                }), {})
                : {},
            ...args,
            ...component.props || {},
        };

        return args;
    }

    const args = getArgs(component);

    const generatedArgTypes = Object.entries(args)
        .reduce((args, [arg, argOptions]) => ({
            ...args,
            [arg]: {
                control: getControl(argOptions),
            },
        }), {});

    return {
        ...generatedArgTypes,
        ...overrides,
    };
}
