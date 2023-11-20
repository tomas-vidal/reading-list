import { render, screen, fireEvent } from "@testing-library/react";

import Book from "./Book";

describe("Book Component", () => {
  let handleFavMock;
  let renderReturn;

  beforeEach(() => {
    handleFavMock = vi.fn();

    renderReturn = render(
      <Book
        cover={
          "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1641398308i/60038757.jpg"
        }
        title={"El resplandor"}
        genre={"Terror"}
        pages={688}
        isbn={"978-0307743657"}
        handleFav={handleFavMock}
      />
    );
  });

  test("should render book component", () => {
    expect(screen.getAllByText("El resplandor")).toBeDefined();
  });

  test("should call handleFav function", () => {
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(handleFavMock).toHaveBeenCalled();
  });

  test("should render fav icon", () => {
    const icon = screen.getByTestId("favButton");
    expect(icon).toBeDefined();
  });

  test("should render remove fav icon", () => {
    renderReturn.rerender(<Book tab={1} />);
    const icon = screen.getByTestId("removeFavButton");

    expect(icon).toBeDefined();
  });
});
