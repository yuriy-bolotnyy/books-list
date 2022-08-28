const print = console.log
// print("new print")

// Book Constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn
}

// UI Constructor
function UI() {
    const DEL = "<a href='#' class='delete'>x</a>"
    const WAIT_BEFORE_CLEAR_FORM = 500

    this.bookListTableBody = document.querySelector("tbody#book-list")
    this.bookFormTextInputsNodeList = document.querySelectorAll("form#book-form input[type=text]")

    this.createTableRow = (book) => {
        let row = document.createElement("tr")

        // Hardcoder book props oneliner
        // row.innerHTML = `<td>${book.title}</td><td>${book.author}</td><td>${book.isbn}</td>`

        // Threeliner, but book props retrieve programmatically
        let keys = Object.keys(book)
        let props = keys.map(prop => book[prop])
        row.innerHTML = "<td>" + props.join("</td><td>") + "</td>"
        row.innerHTML += `<td>${DEL}</td>`

        return row
    }

    this.clearAddBookFormTextInputs = () => {
        this.bookFormTextInputsNodeList.forEach(node => {
            node.value = ""
        });
    }

    this.clearAddBookForm = () => {
        setTimeout(() => {
            this.clearAddBookFormTextInputs()
        }, WAIT_BEFORE_CLEAR_FORM)

    }

    this.addBookToList = (book) => {
        // print(book)
        let addBookRow = this.createTableRow(book)
        // print(addBookRow)
        this.bookListTableBody.appendChild(addBookRow)
        this.clearAddBookForm()
    }
}



let bookProps = () => {
    let bookPropValue = (prop) => document.querySelector(`form input#${prop}`).value
    let bookPropNames = ["title", "author", "isbn"]
    let bookProps = {}
    bookPropNames.forEach(element => bookProps[element] = bookPropValue(element));
    // bookPropNames.map(element => bookProps[element] = bookPropValue(element))
    return bookProps

    // return {
    //     title: bookProp("title"),
    //     author: bookProp("author"),
    //     isbn: bookProp("isbn")
    // }
}

let formSubmitEventHandler = (event) => {
    console.log(`Form submission detected: ${event.target}`)
    // console.log(event.target)
    const props = bookProps()
    // Instantiate new Book 
    const book = new Book(props.title, props.author, props.isbn)
    // console.log(book)

    let ui = new UI();
    ui.addBookToList(book)

    event.preventDefault()
}

let bookTableListEventHandler = (event) => {
    print(`Book List click event: ${event.target}`)
}

// Event Listeners
let form = document.getElementById("book-form");
form.addEventListener('submit', formSubmitEventHandler)

let bookTableList = document.querySelector("table tbody#book-list")
bookTableList.addEventListener('click', bookTableListEventHandler)