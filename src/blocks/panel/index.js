/**
 * BLOCK: My Panel Block
 */

import classnames from 'classnames';
import { Component } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import {
	registerBlockType,
	createBlock,
} from '@wordpress/blocks';
import {
	RichText,
	AlignmentToolbar,
	BlockControls,
	BlockAlignmentToolbar,
	InnerBlocks,
} from '@wordpress/editor';
import {
	Button,
	withFallbackStyles,
	IconButton,
	Dashicon,
} from '@wordpress/components';

import './style.scss';
import './editor.scss';
import Inspector from './components/Inspector';

const blockAttributes = {
	panelTitle: {
		type: 'array',
		selector: '.ab-accordion-title',
		source: 'children',
	},
	panelContent: {
		type: 'array',
		selector: '.ab-accordion-text',
		source: 'children',
	},
	panelAlignment: {
		type: 'string',
	},
	panelType: {
		type: 'string',
	},
};

class MyPanelBlock extends Component {

	render() {

		// Setup the attributes
		const { attributes: { panelTitle, panelType, panelAlignment, panelContent } } = this.props;
		const panelClass = classnames( 'panel', panelType );

		return [
			// Show the block alignment controls on focus
			<BlockControls key="controls">
				<AlignmentToolbar
					value={ panelAlignment }
					onChange={ ( value ) => this.props.setAttributes( { panelAlignment: value } ) }
				/>
			</BlockControls>,
			// Show the block controls on focus
			<Inspector key="inspector"
				{ ...this.props }
			/>,
			// Show the button markup in the editor
			<div className={panelClass}>
				<div className="panel-header">
					<RichText
						tagName="h3"
						placeholder="ヘッダータイトル"
						value={panelTitle}
						onChange={(value) => this.props.setAttributes({ panelTitle: value })}
					/>
				</div>
				<div className="panel-body">
					<InnerBlocks />
				</div>
			</div>
		];
	}
}

// Register the block
registerBlockType( 'test-blocks/my-panel', {
	title: __( 'MyPanel', 'test-blocks' ),
	description: "オリジナルのパネル",
	icon: 'editor-ul',
	category: 'test-blocks',
	keywords: [
		'panel', 'test-blocks',
	],
	attributes: blockAttributes,

	// Render the block components
	edit: MyPanelBlock,

	// Save the attributes and markup
	save: function( props ) {

		// Setup the attributes
		const { panelTitle, panelContent, panelAlignment, panelType, } = props.attributes;
		const panelClass = classnames( 'panel', panelType );
		// Save the block markup for the front end
		return (
			<div className={panelClass}>
				<div className="panel-header">
					<RichText.Content
						value={panelTitle}
					/>
				</div>
				<div className="panel-body">
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},
});
