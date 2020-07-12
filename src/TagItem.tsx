import * as React from 'react';

export default function ({state, props}:any) {
    let _focalLength = state.radius * 1.5;
    return (
        <>
        {state.tags.map(
                function (tag:any, index:number) {
                    let scale = _focalLength / (_focalLength - tag.z);
                    let alpha = (tag.z + state.radius) / (state.radius*2);
                    return <li style={{
                        display: 'inline-block',
                        position: 'absolute',
                        height: '50px',
                        lineHeight: '50px',
                        textDecoration: 'none',
                        left: tag.x + 'px',
                        top: tag.y + 'px',
                        fontSize: (props.fontSize? props.fontSize : 8) * scale + 'px',
                        opacity: alpha + 0.5,
                        color: tag.color
                    }} key={index.toString()}><a style={{ whiteSpace: 'nowrap'}}>{tag.name}</a></li>
                })
        }
        </>
    )
}