import React, { Component } from 'react';
import { EMPTY, YES, NO } from '../../../constants/Params';
import { showToast } from '../../../utils';
import NumberFormat from 'react-number-format';

export default class ListItem extends Component {

    isChecked(_id) {
        const { listChecked } = this.props;
        if (listChecked.indexOf(_id) !== -1) {
            return true;
        }
        return false;
    }

    onChange = (e) => {
        let { name, value } = e.target;
        this.setState({ [name]: value });
    }

    onChangeField = (data) => {
        this.props.onChangeField(data).then(res => {
            if (res.success) {
                showToast(res.message);
            } else {
                showToast(res.message, 'error');
            }
        });
    }

    render() {
        const { model, onDelete, isNull, onGetEdit, onChecked, colSpan } = this.props;

        if (isNull) {
            return (<tr><td colSpan={colSpan} className="text-center">{EMPTY}</td></tr>);
        }
        return (
            <tr>
                <td className="text-center">
                    <div className="custom-control custom-checkbox ckb-custom">
                        <input
                            className="custom-control-input" id={`customCheck1${model._id}`}
                            type="checkbox"
                            checked={this.isChecked(model._id)}
                            value={model._id}
                            onChange={onChecked}
                        />
                        <label className="custom-control-label" htmlFor={`customCheck1${model._id}`}></label>
                    </div>
                </td>
                <td className="text-center">{model.code}</td>
                <td className="text-center">{model.name}</td>
                <td className="text-center">
                    <NumberFormat
                        value={model.price_first}
                        displayType={'text'}
                        thousandSeparator={true}
                    /> {this.props.auth.unit}
                </td>
                <td className="text-center">
                    <NumberFormat
                        value={model.price_curr}
                        displayType={'text'}
                        thousandSeparator={true}
                    /> {this.props.auth.unit}
                </td>
                <td className="text-center">
                    <div className="custom-control custom-checkbox ckb-custom2">
                        <input
                            className="custom-control-input" id={`checkShow${model._id}`}
                            type="checkbox"
                            checked={model.publish}
                            onChange={() => this.onChangeField({
                                _id: model._id,
                                field: "publish",
                                value: model.publish ? NO : YES,
                            })}
                        />
                        <label className="custom-control-label" htmlFor={`checkShow${model._id}`}></label>
                    </div>

                </td>
                <td className="text-center">
                    <button onClick={() => onGetEdit(model._id)} className="btn btn-sm btn-primary mr-1" type="button">
                        <i className="fa fa-edit"></i>
                    </button>
                    <button onClick={() => onDelete(model._id)} className="btn btn-sm btn-danger" type="button">
                        <i className="fa fa-trash"></i>
                    </button>
                </td>
            </tr>
        );
    }
}