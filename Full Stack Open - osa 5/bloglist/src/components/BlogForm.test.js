import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import BlogForm from "./BlogForm";

test("<BlogForm /> updates parent state and calls onSubmit", () => {
  const createBlogMockHandler = jest.fn();

  const component = render(<BlogForm createBlog={createBlogMockHandler} />);

  const titleInput = component.container.querySelector(".titleInput");
  const authorInput = component.container.querySelector(".authorInput");
  const urlInput = component.container.querySelector(".urlInput");
  const form = component.container.querySelector("form");

  fireEvent.change(titleInput, {
    target: { value: "Blog" },
  });
  fireEvent.change(authorInput, {
    target: { value: "test" },
  });
  fireEvent.change(urlInput, {
    target: { value: "http://test.com" },
  });
  fireEvent.submit(form);

  expect(createBlogMockHandler.mock.calls).toHaveLength(1);
  expect(createBlogMockHandler.mock.calls[0][0].title).toBe("Blog");
  expect(createBlogMockHandler.mock.calls[0][0].author).toBe("test");
  expect(createBlogMockHandler.mock.calls[0][0].url).toBe("http://test.com");
});