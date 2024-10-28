let modal
let data
let form
let toast
let modalConfirmar

function init() {
    let storedData = localStorage.getItem('se-data')
    if (storedData)
        data = JSON.parse(storedData)
    else
        data = []

    modal = new bootstrap.Modal(document.getElementById('modal'))
    modalConfirmar = new bootstrap.Modal(document.getElementById('modalConfirmar'))
    form = {
        alert: document.getElementById('alert'),
        nombre: document.getElementById('nombre'),
        apellido: document.getElementById('apellido'),
        id: document.getElementById('id')
    };

    displayData()
}

function save() {
    const id = form.id.value
    const nombre = form.nombre.value.trim()
    const apellido = form.apellido.value.trim()

    if (id) {
        const index = data.findIndex(item => item.id == id)
        if (index > -1) {
            data[index] = { id, nombre, apellido }
        }
    } else {
        data.push({ id: getId(), nombre, apellido })
    }

    localStorage.setItem('se-data', JSON.stringify(data))
    displayData()
    modal.hide()
    form.nombre.value = ''
    form.apellido.value = ''
    form.id.value = ''
}

function displayData() {
    const table = document.getElementById('data-table')
    table.innerHTML = ''

    data.forEach(item => {
        const row = document.createElement('tr')
        row.innerHTML = `
            <td>${item.nombre}</td>
            <td>${item.apellido}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editar(${item.id})">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="eliminar(${item.id})">Eliminar</button>
            </td>
        `
        table.appendChild(row)
    })
}

function editar(id) {
    const item = data.find(item => item.id == id)
    if (item) {
        form.nombre.value = item.nombre
        form.apellido.value = item.apellido
        form.id.value = item.id
        modal.show()
    }
}

function eliminar(id) {
    form.id.value = id
    modalConfirmar.show()
}

function confirmarEliminar() {
    const id = form.id.value
    data = data.filter(item => item.id != id)
    localStorage.setItem('se-data', JSON.stringify(data))
    displayData()
    modalConfirmar.hide()
}

function getId() {
    return Date.now()
}

function showModal() {
    form.nombre.value = ''
    form.apellido.value = ''
    form.id.value = ''
    modal.show()
}

window.addEventListener('load', init)