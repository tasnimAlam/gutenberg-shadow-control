import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import "./style.scss";

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { PanelColorSettings } = wp.editor;
const { BaseControl, ButtonGroup, Button } = wp.components;

class ShadowControl extends Component {
  state = {
    hOffset: this.props.hOffset || 0,
    vOffset: this.props.vOffset || 0,
    blur: this.props.blur || 0,
    spread: this.props.spread || 0,
    color: this.props.color || "#000000",
    shadowType: this.props.type || "initial",
    options: ["inset", "initial", "inherit"]
  };

  onColorChange = newColor => {
    this.setState({ color: newColor }, () => {
      this.props.onChange({ ...this.state });
    });
  };

  onInputChange = event => {
    let { name, value } = event.target;

    this.setState({ [name]: parseInt(value) }, () =>
      this.props.onChange({ ...this.state })
    );
  };

  onTypeChange = type => {
    this.setState({ shadowType: type }, () => {
      this.props.onChange({ ...this.state });
    });
  };

  render() {
    const {
      hOffset,
      vOffset,
      blur,
      spread,
      color,
      shadowType,
      options
    } = this.state;

    return (
      <Fragment>
        <PanelColorSettings
          title={__("Shadow Color")}
          initialOpen={false}
          colorSettings={[
            {
              label: __("Color"),
              value: color,
              onChange: newColor => this.onColorChange(newColor)
            }
          ]}
        />

        <div>
          <div className="shadow-control-label">Shadow Control</div>

          <div className="input-container">
            <div className="input-wrapper">
              <input
                type="number"
                name="hOffset"
                value={hOffset}
                onChange={this.onInputChange}
              />
              <label className="shadow-control-input-label">H-Offset</label>
            </div>
            <div className="input-wrapper">
              <input
                type="number"
                name="vOffset"
                value={vOffset}
                onChange={this.onInputChange}
              />
              <label className="shadow-control-input-label">V-Offset</label>
            </div>
            <div className="input-wrapper">
              <input
                type="number"
                name="blur"
                value={blur}
                onChange={this.onInputChange}
              />
              <label className="shadow-control-input-label">Blur</label>
            </div>
            <div className="input-wrapper">
              <input
                type="number"
                name="spread"
                value={spread}
                onChange={this.onInputChange}
              />
              <label className="shadow-control-input-label">Spread</label>
            </div>
          </div>
          <BaseControl
            label={__("Shadow Type")}
            className="shadow-control-type-label"
          >
            <ButtonGroup>
              {options.map(type => (
                <Button
                  className="shadow-control-type-button"
                  isPrimary={shadowType === type}
                  isDefault={shadowType !== type}
                  onClick={() => this.onTypeChange(type)}
                >
                  {type}
                </Button>
              ))}
            </ButtonGroup>
          </BaseControl>
        </div>
      </Fragment>
    );
  }
}

ShadowControl.propTypes = {
  hOffset: PropTypes.number,
  vOffset: PropTypes.number,
  blur: PropTypes.number,
  spread: PropTypes.number,
  color: PropTypes.string,
  shadowType: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default ShadowControl;
