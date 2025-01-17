/* External dependencies */
import { Component } from "@wordpress/element";
import PropTypes from "prop-types";
import { __ } from "@wordpress/i18n";
import {
	replacementVariablesShape,
	recommendedReplacementVariablesShape,
	SettingsSnippetEditor,
} from "@yoast/replacement-variable-editor";

/* Internal dependencies */
import SnippetPreviewSection from "./SnippetPreviewSection";
import linkHiddenFields, { linkFieldsShape } from "./higherorder/linkHiddenField";

/**
 * Component class for the Settings replacement variable editor.
 */
class SettingsReplacementVariableEditor extends Component {
	/**
	 * Renders the component.
	 *
	 * @returns {wp.Element} The component.
	 */
	render() {
		const {
			title,
			description,
			replacementVariables,
			recommendedReplacementVariables,
			titleTarget,
			descriptionTarget,
			labels,
			descriptionPlaceholder,
		} = this.props;

		const placeholder = descriptionPlaceholder || __( "Modify your meta description by editing it right here", "wordpress-seo" );

		return (
			<SnippetPreviewSection
				hasPaperStyle={ this.props.hasPaperStyle }
			>
				<SettingsSnippetEditor
					descriptionEditorFieldPlaceholder={ placeholder }
					onChange={ ( field, value ) => {
						switch ( field ) {
							case "title":
								title.onChange( value );
								break;
							case "description":
								description.onChange( value );
								break;
						}
					} }
					replacementVariables={ replacementVariables }
					recommendedReplacementVariables={ recommendedReplacementVariables }
					data={ {
						title: title.value,
						description: description.value,
					} }
					hasPaperStyle={ this.props.hasPaperStyle }
					fieldIds={ {
						title: titleTarget + "-snippet-editor",
						description: descriptionTarget + "-snippet-editor",
					} }
					labels={ labels }
				/>
			</SnippetPreviewSection>
		);
	}
}

SettingsReplacementVariableEditor.propTypes = {
	replacementVariables: replacementVariablesShape,
	recommendedReplacementVariables: recommendedReplacementVariablesShape,
	title: linkFieldsShape,
	description: linkFieldsShape,
	postType: PropTypes.string,
	hasPaperStyle: PropTypes.bool,
	titleTarget: PropTypes.string.isRequired,
	descriptionTarget: PropTypes.string.isRequired,
	labels: PropTypes.shape( {
		title: PropTypes.string,
		description: PropTypes.string,
	} ),
	descriptionPlaceholder: PropTypes.string,
};

SettingsReplacementVariableEditor.defaultProps = {
	hasPaperStyle: true,
};

export default linkHiddenFields( props => {
	return [
		{
			name: "title",
			fieldId: props.titleTarget,
		},
		{
			name: "description",
			fieldId: props.descriptionTarget,
		},
	];
} )( SettingsReplacementVariableEditor );
