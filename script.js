// Membuat tombol close pada item
const item = document.getElementsByTagName('li');
for (let i = 0; i < item.length; i++) {
  let span = document.createElement('span');
  let txt = document.createTextNode('\u00D7');
  span.className = 'close';
  span.appendChild(txt);
  item[i].appendChild(span);
}

// Hapus item
const close = document.getElementsByClassName('close');
for (let i = 0; i < close.length; i++) {
  close[i].onclick = function () {
    let div = this.parentElement;
    div.style.display = 'none';
  };
}

const list = document.querySelector('ul');
list.addEventListener(
  'click',
  function (e) {
    if (e.target.tagName === 'LI') {
      e.target.classList.toggle('checked');
    }
  },
  false
);

// Menambahkan Items
function newItem() {
  const li = document.createElement('li');
  const inputValue = document.getElementById('inputItem').value;
  const text = document.createTextNode(inputValue);
  li.appendChild(text);

  if (inputValue === '') {
    alert('Masukan nama barang');
  } else {
    document.getElementById('listItems').appendChild(li);
  }
  document.getElementById('inputItem').value = '';

  const span = document.createElement('span');
  const txt = document.createTextNode('\u00D7');
  span.className = 'close';
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement;
      div.style.display = 'none';
    };
  }
}
