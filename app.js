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
    this.bookFormTextInputNodesList = document.querySelectorAll("form#book-form input[type=text]")

    this.bookListRows = () => {
        let rows = this.bookListTableBody.childNodes
    }

    this.createTableRow = (book) => {
        let createTableDataCell = (bookPropName, bookPropValue) => {
            let cell = document.createElement("td")
            cell.id = bookPropName
            cell.textContent = bookPropValue
            return cell
        }

        let row = document.createElement("tr")

        // Hardcoder book props oneliner
        // row.innerHTML = `<td>${book.title}</td><td>${book.author}</td><td>${book.isbn}</td>`

        // Threeliner, but book props retrieve programmatically
        let bookPropNames = Object.keys(book)
        // let bookPropValues = bookPropNames.map(prop => book[prop])
        // row.innerHTML = "<td>" + bookPropValues.join("</td><td>") + "</td>"
        // row.innerHTML += `<td>${DEL}</td>`

        // Even more soficsticated approach - buld a cell separately and then embed it
        bookPropNames.forEach(bookPropName => {
            bookPropValue = book[bookPropName]
            let cell = createTableDataCell(bookPropName, bookPropValue)
            row.appendChild(cell)
        });

        // Add 'x' delete link
        row.innerHTML += `<td>${DEL}</td>`

        return row
    }

    this.clearAddBookFormTextInputs = () => {
        this.bookFormTextInputNodesList.forEach(node => {
            node.value = ""
        });
    }

    this.clearAddBookForm = () => {
        setTimeout(() => {
            this.clearAddBookFormTextInputs()
        }, WAIT_BEFORE_CLEAR_FORM)

    }

    this.createAlert = (msg, className) => {
        const div = document.createElement('div')
        div.className = `alert ${className}`
        div.appendChild(document.createTextNode(msg))
        return div
    }

    this.showAlert = (msg, className, clearTimeout=2) => {
        const alert = this.createAlert(msg, className)
        const table = document.querySelector("table")
        table.parentNode.insertBefore(alert, table)
        setTimeout(() => {alert.remove()}, clearTimeout*1000)
    }

    this.showErrorAlert = (msg, clearTimeout=5) => {
        this.showAlert(msg, 'error', clearTimeout)
    }

    this.showSuccessAlert = (msg, clearTimeout=2) => {
        this.showAlert(msg, 'success', clearTimeout)
    }

    this.addBookToList = (book) => {
        try {
            ['title', 'author', 'isbn'].forEach(it => {
                if (book[it] === "") {
                    ui.showErrorAlert(`${it} empty! Fill it out and try once more!`)
                    throw BreakException
                    // return
                }
            })
        } catch (BreakException) {
            return
        }

        // if (book.title === "" || book.author === "" || book.isbn === "") {
        //     ui.showErrorAlert("Some book fields are empty! Fill it out and try more!")
        //     return
        // }
        // print(book)
        let addBookRow = this.createTableRow(book)
        // print(addBookRow)
        this.bookListTableBody.appendChild(addBookRow)
        ui.showSuccessAlert(`Book added :)`)
        this.clearAddBookForm()
    }

    this.deleteBookFromList = (isbnRequested) => {
        // delete book from list
        let allBookRows = document.querySelectorAll("tbody#book-list tr")
        allBookRows.forEach(row => {
            let isbn = row.querySelector("#isbn").textContent
            if (isbn === isbnRequested) {
                print("Found row for deletion!")
                row.remove()
                ui.showSuccessAlert(`Book (${isbn}) deleted`)
            }
        })
    }
}

let ui = new UI();

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

    // let ui = new UI();
    ui.addBookToList(book)

    event.preventDefault()
}

let bookTableListEventHandler = (event) => {
    let eventTarget = event.target
    let eventTargetText = eventTarget.text
    let eventTargetClassName = eventTarget.className

    print(`Book List event -> clicked ${eventTargetText} .${eventTargetClassName}`)

    // Book deletion requested
    if (eventTargetClassName === 'delete' && eventTargetText === 'x') {
        let row = event.target.parentNode.parentNode
        let isbn = row.querySelector("td#isbn").textContent
        print(`ISBN #${isbn} book deletion requested!`)
        ui.deleteBookFromList(isbn)
    }

    event.preventDefault()
}

// Event Listeners
let form = document.getElementById("book-form");
form.addEventListener('submit', formSubmitEventHandler)

let bookTableList = document.querySelector("table tbody#book-list")
bookTableList.addEventListener('click', bookTableListEventHandler)