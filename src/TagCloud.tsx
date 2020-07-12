import * as React from 'react';
import TagItem from './TagItem';

interface Tag {
    tag: string,
    i: number
}

const BASEANGLE = Math.PI / 360;

export default class TagCloud extends React.PureComponent<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            tags: [],
            speed: 1,
            radius: this.props.radius,
            tagName: this.props.tagName,
            angleX: 0,
            angleY: 0,
            timer: ''
        }
    }

    componentDidMount() {
        let _this3 = this;
        document.addEventListener('mousemove', function (e) {
            let angleX = 2 * (e.clientX / document.body.getBoundingClientRect().width - 0.5) * _this3.state.speed * BASEANGLE;
            let angleY = 2 * (e.clientY / document.body.getBoundingClientRect().height - 0.5) * _this3.state.speed * BASEANGLE;
            _this3.setState({
                angleX: angleX,
                angleY: angleY
            });
        });
        if (this.state.tagName.length === 0) {
            return;
        }


        let animation = function animation() {
            _this3.rotateX();
            _this3.rotateY();
            requestAnimationFrame(animation);
        };

        requestAnimationFrame(function () {
            animation();
        });
        this.move(this.state.tagName);
    }

    move(tagName: any) {
        let _this4 = this;
        let len = tagName.length;
        let tags = tagName.map(function <Tag>(tag: string, i: number) {
            let angleA = Math.acos((2 * (i + 1) - 1) / len - 1);
            let angleB = angleA * Math.sqrt(len * Math.PI);
            let z = _this4.state.radius * Math.cos(angleA);
            let y = _this4.state.radius * Math.sin(angleA) * Math.sin(angleB);
            let x = _this4.state.radius * Math.sin(angleA) * Math.cos(angleB);
            let color = _this4.props.color? _this4.props.color : '#' + Math.floor(Math.random() * 0xffffff).toString(16);
            let tagProps = {
                x: x,
                y: y,
                z: z,
                name: tag,
                color: color
            };
            return tagProps;
        });
        this.setState({
            tags: tags
        });
    }

    rotateX() {
        let cos = Math.cos(this.state.angleX),
            sin = Math.sin(this.state.angleX);
        let tags = this.state.tags.map(function (tag: any) {
            let y = tag.y * cos - tag.z * sin;
            let z = tag.z * cos + tag.y * sin;
            if(y||z) {
                tag.y = y;
                tag.z = z;
            }
            return tag;
        });
        this.setState({
            tags: tags
        });
    }

    rotateY() {
        let cos = Math.cos(this.state.angleY);
        let sin = Math.sin(this.state.angleY);
        let tags = this.state.tags.map(function (tag: any) {
            let x = tag.x * cos - tag.z * sin;
            let z = tag.z * cos + tag.x * sin;
            if(x||z) {
                tag.x = x;
                tag.z = z;
            }
            return tag;
        });
        this.setState({
            tags: tags
        });
    }

    render() {
        let _this5 = this;
        let containerStyle = {
            width: '100%',
            height: '100%'
        };
        return(<div
            className={"tag-cloud-container"}
            style={containerStyle}>
            <ul className={"wrapper"}
                style={{listStyleType: 'none', position: 'absolute',
                    left: '50%',
                    top: '100px'}}>
                <TagItem state={_this5.state} props={_this5.props}/>
            </ul>
        </div>)
    }
}