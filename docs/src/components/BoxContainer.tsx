import React, { ReactNode } from "react";
import classNames from "classnames";
import styles from "./styles.module.css";

interface ContainerProps {
  className?: string;
  children: ReactNode;
  props?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >;
}

const BoxContainer: React.FC<ContainerProps> = ({
  className,
  children,
  ...props
}) => (
  <div className={classNames(styles.boxContainer, className)} {...props}>
    {children}
  </div>
);

export default BoxContainer;
