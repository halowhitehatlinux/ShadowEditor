import './css/FilterPanel.css';
import { classNames, PropTypes, Window, Content, TabLayout, Buttons, Button, Form, FormControl, Label, Input, Select, CheckBox } from '../../../third_party';
import CssUtils from '../../../utils/CssUtils';

/**
 * 滤镜选项窗口
 * @author tengge / https://github.com/tengge1
 */
class FilterPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hueRotate: 0,
            saturate: 0,
            brightness: 0,
            blur: 0,
            contrast: 0,
            grayscale: 0,
            invert: 0,
            sepia: 0,
        };

        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    render() {
        const { hueRotate, saturate, brightness, blur, contrast, grayscale, invert, sepia } = this.state;

        return <Form className={'FilterPanel'}>
            <FormControl>
                <Label>{_t('HueRotate')}</Label>
                <Input type={'number'} name={'hueRotate'} value={hueRotate} onChange={this.handleChange}></Input>
            </FormControl>
            <FormControl>
                <Label>{_t('Saturate')}</Label>
                <Input type={'number'} name={'saturate'} value={saturate} onChange={this.handleChange}></Input>
            </FormControl>
            <FormControl>
                <Label>{_t('Brightness')}</Label>
                <Input type={'number'} name={'brightness'} value={brightness} onChange={this.handleChange}></Input>
            </FormControl>
            <FormControl>
                <Label>{_t('Blur')}</Label>
                <Input type={'number'} name={'blur'} value={blur} onChange={this.handleChange}></Input>
            </FormControl>
            <FormControl>
                <Label>{_t('Contrast')}</Label>
                <Input type={'number'} name={'contrast'} value={contrast} onChange={this.handleChange}></Input>
            </FormControl>
            <FormControl>
                <Label>{_t('Grayscale')}</Label>
                <Input type={'number'} name={'grayscale'} value={grayscale} onChange={this.handleChange}></Input>
            </FormControl>
            <FormControl>
                <Label>{_t('Invert')}</Label>
                <Input type={'number'} name={'invert'} value={invert} onChange={this.handleChange}></Input>
            </FormControl>
            <FormControl>
                <Label>{_t('Sepia')}</Label>
                <Input type={'number'} name={'sepia'} value={sepia} onChange={this.handleChange}></Input>
            </FormControl>
        </Form>;
    }

    handleUpdate() {
        const renderer = app.editor.renderer;

        const { hueRotate, saturate, brightness, blur, contrast, grayscale, invert, sepia } = CssUtils.parseFilter(renderer.domElement.style.filter);

        this.setState({
            hueRotate,
            saturate,
            brightness,
            blur,
            contrast,
            grayscale,
            invert,
            sepia,
        });
    }

    handleChange(value, name) {
        if (value === null) {
            this.setState({
                [name]: value,
            });
            return;
        }

        const { hueRotate, saturate, brightness, blur, contrast, grayscale, invert, sepia } = Object.assign({}, this.state, {
            [name]: value,
        });

        const filters = {
            hueRotate,
            saturate,
            brightness,
            blur,
            contrast,
            grayscale,
            invert,
            sepia,
        };

        Object.assign(app.options, filters);

        const renderer = app.editor.renderer;

        renderer.domElement.style.filter = CssUtils.serializeFilter(filters);

        this.handleUpdate();
    }
}

export default FilterPanel;