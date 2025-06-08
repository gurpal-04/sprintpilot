// components/ui/modal/Modal.test.jsx
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Modal from "./Modal";

describe("Modal Component", () => {
  it("renders correctly when open", () => {
    const { getByText } = render(
      <Modal isOpen={true} onClose={() => {}}>
        <h2>Test Modal</h2>
      </Modal>
    );

    expect(getByText("Test Modal")).toBeInTheDocument();
  });

  it("does not render when closed", () => {
    const { queryByText } = render(
      <Modal isOpen={false} onClose={() => {}}>
        <h2>Test Modal</h2>
      </Modal>
    );

    expect(queryByText("Test Modal")).not.toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    const onCloseMock = jest.fn();
    const { getByRole } = render(
      <Modal isOpen={true} onClose={onCloseMock}>
        <h2>Test Modal</h2>
      </Modal>
    );

    fireEvent.click(getByRole("button"));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it("closes modal on Escape key press", () => {
    const onCloseMock = jest.fn();
    const { getByText } = render(
      <Modal isOpen={true} onClose={onCloseMock}>
        <h2>Test Modal</h2>
      </Modal>
    );

    fireEvent.keyDown(getByText("Test Modal"), { key: "Escape" });
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
