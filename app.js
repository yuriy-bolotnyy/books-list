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
    this.bookListTableBody = document.querySelector("tbody#book-list")

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

    this.addBookToList = (book) => {
        print(book)
        let addBookRow = this.createTableRow(book)
        print(addBookRow)
        this.bookListTableBody.appendChild(addBookRow)
    }
}
    


// Event Listeners
let form = document.getElementById("book-form");
// console.log(form)

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

form.addEventListener('submit', formSubmitEventHandler)
