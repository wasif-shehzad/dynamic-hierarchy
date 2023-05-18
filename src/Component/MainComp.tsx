import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import "./style.css";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

interface Node {
  id: number;
  label: string;
  children: Node[];
}

const MainComp = () => {
  const [allData, setAllData] = useState<Node[]>([
    {
      id: 1,
      label: "Parent",
      children: [],
    },
  ]);
  const [count, setCount] = useState<number>(2);

  const handleAddChild = (parentId: number, label: string) => {
    const newChild: Node = {
      id: count,
      label: label,
      children: [],
    };

    setCount(count + 1);

    const updatedTreeData = addChildNode(allData, parentId, newChild);

    setAllData(updatedTreeData);
  };

  const addChildNode = (
    data: Node[],
    parentId: number,
    newNode: Node
  ): Node[] => {
    return data.map((node) => {
      if (node.id === parentId) {
        return {
          ...node,
          children: [...node.children, newNode],
        };
      } else if (node.children && node.children.length > 0) {
        return {
          ...node,
          children: addChildNode(node.children, parentId, newNode),
        };
      }
      return node;
    });
  };

  const handleRemoveChild = (parentId: number, childIndex: number) => {
    const updatedTreeData = removeChildNode(allData, parentId, childIndex);
    setAllData(updatedTreeData);
  };

  const removeChildNode = (
    data: Node[],
    parentId: number,
    childIndex: number
  ): Node[] => {
    return data.map((node) => {
      if (node.id === parentId) {
        return {
          ...node,
          children: node.children.filter((_, index) => index !== childIndex),
        };
      } else if (node.children && node.children.length > 0) {
        return {
          ...node,
          children: removeChildNode(node.children, parentId, childIndex),
        };
      }
      return node;
    });
  };

  const renderAllData = (data: Node[]) => (
    <ul>
      {data.map((node, index) => (
        <li key={node.id}>
          <a href="#">
            <span>{node.label}</span>
          </a>
          {node.children &&
            node.children.length > 0 &&
            renderAllData(node.children)}
          <Formik
            initialValues={{ label: "" }}
            onSubmit={(values, { resetForm }) => {
              handleAddChild(node.id, values.label);
              resetForm();
            }}
          >
            <Form>
              <Field type="text" name="label" />
              <ErrorMessage name="label" component="div" />
              <button type="submit">
                <AddCircleOutlineIcon />
              </button>
            </Form>
          </Formik>
          {node.children && node.children.length > 0 && (
            <ul>
              {node.children.map((child, childIndex) => (
                <li key={child.id}>
                  <span>{child.label}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveChild(node.id, childIndex)}
                  >
                    <RemoveCircleOutlineIcon />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );

  return <div className="tree">{renderAllData(allData)}</div>;
};

export default MainComp;
