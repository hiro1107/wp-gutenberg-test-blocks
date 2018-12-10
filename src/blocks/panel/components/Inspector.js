/**
 * Inspector Controls
 */

// Setup the block
const { __ } = wp.i18n;
const { Component } = wp.element;

// Import block components
const {
	InspectorControls,
} = wp.editor;

// Import Inspector components
const {
	PanelBody,
	SelectControl
} = wp.components;

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Inspector extends Component {

	constructor(props) {
		super(...arguments);
	}

	render() {

		// Setup the attributes
		const { panelType } = this.props.attributes;

		return (
			<InspectorControls key="inspector">
				<PanelBody>
					<SelectControl 
						label="パネルのタイプ"
						value={panelType}
						options={[
							{ label: 'default', value: '' },
							{ label: 'light-blue', value: 'panel-light-blue' },
							{ label: 'light-yellow', value: 'panel-light-yellow' },
						]}
						onChange={(value) => this.props.setAttributes({ panelType: value })}
					/>
				</PanelBody>
			</InspectorControls>
		);
	}
}
