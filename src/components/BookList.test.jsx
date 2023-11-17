import { render, screen } from "@testing-library/react";
import BookList from "./BookList";
import { expect } from "vitest";

describe("BookList Component", () => {
  beforeEach(() => {});

  test("should not display book list if there are no books", () => {
    render(<BookList bookList={[]} />);
    const error = screen.getByText(/what/i);

    expect(error).toBeDefined();
  });

  test("Should display two books", () => {
    render(<BookList bookList={[
      {
        "book": {
          "title": "El Señor de los Anillos",
          "pages": 1200,
          "genre": "Fantasía",
          "cover": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1566425108i/33.jpg",
          "synopsis": "Una aventura épica en un mundo de fantasía llamado la Tierra Media.",
          "year": 1954,
          "ISBN": "978-0618640157",
          "author": {
            "name": "J.R.R. Tolkien",
            "otherBooks": ["El Hobbit", "El Silmarillion"]
          }
        }
      },
      {
        "book": {
          "title": "Juego de Tronos",
          "pages": 694,
          "genre": "Fantasía",
          "cover": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1273763400i/8189620.jpg",
          "synopsis": "En un reino donde las estaciones duran años, una batalla épica por el trono se desarrolla.",
          "year": 1996,
          "ISBN": "978-0553103540",
          "author": {
            "name": "George R. R. Martin",
            "otherBooks": [
              "Choque de Reyes",
              "Tormenta de Espadas",
              "Festín de Cuervos"
            ]
          }
        }
      },
    ]
  }
  handleFav={vi.fn()}
    />);
    const book1 = screen.getByText(/Señor/i);
    const book2 = screen.getByText(/Tronos/i);

    expect(book1).toBeDefined();
    expect(book2).toBeDefined();
  
});
});