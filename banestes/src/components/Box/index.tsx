import React from "react";
import style from "./Box.module.scss"
interface BoxProps{
    children: React.ReactNode;
    className?: string;
}
export default class Box extends React.Component<BoxProps>{
    render(){
        return(
            <div className={`${style.bodyBox} ${this.props.className || ""}`}>
                {this.props.children}
            </div>
        );
    }
}
