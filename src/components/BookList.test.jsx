import { render, screen, fireEvent } from "@testing-library/react";
import BookList from "./BookList";

describe("BookList Component", () => {
  beforeEach(() => {});

  test("should not display book list if there are no books", () => {
    render(<BookList bookList={[]} />);
    const error = screen.getByText(/what/i);

    expect(error).toBeDefined();
  });
});
