import * as React from 'react';

export interface TagCloudProps extends React.Props<TagCloud> {
    radius: number;
    tagName: any;
    color?: string;
    speed?: number;
    fontSize?: number;
}

export interface TagCloudState extends React.State<TagCloud> {
    radius: number;
    tags: any;
    angleX: number;
    angleY: number;
    tagName: any;
    speed: number;
    timer: string;
}

declare class TagCloud extends React.Component<TagCloudProps, TagCloudState> {

}

declare module 'react-3d-cloud' {

}

export default TagCloud;