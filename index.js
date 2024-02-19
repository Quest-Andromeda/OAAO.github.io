document.addEventListener('DOMContentLoaded', (event) => {
  window.onload = function() {
    const totalA = document.getElementsByTagName('a');
    for (var a = 0; a < totalA.length; a++) {
      if (totalA.item(a).href == "https://formfacade.com/website/customize-google-forms.html?product=website&utm_source=madewith&utm_medium=107400614936190841234&utm_campaign=1FAIpQLScM0eswrGbnlZiRoN9HGh8lgJUip_gVX2o8ZloEVzy_VYI5OA&plan=free&userId=107400614936190841234&by=OAAO%20sign%20up%20form&utm_content=logo") {
        totalA.item(a).remove();
        console.log("asdasd");
        a++;
      }
    }
  }


  const canvas = document.getElementById('backgroundCanvas');
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const stars = [];

  function generateStars() {
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        speed: Math.random() * 2,
        color: "#aaaaaa",
      });
      setInterval(function() { twinkle(i); }, randomInt(7000, 11000));
    }
  }

  function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const star of stars) {
      ctx.fillStyle = star.color;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function randomInt(min, max) {
    return Math.floor(Math.random() * max) + min;
  }

  function moveStars() {
    stars.forEach(star => {
      star.y += star.speed;
      if (star.y > canvas.height) {
        star.y = 0;
        star.x = randomInt(0, canvas.width);
      }
    });
  }

  function scrollStars(mult, all) {
    if (all) {
      for (var i = 0; i < stars.length; i++) {
        stars[i].y += stars[i].speed * mult;
        if (stars[i].y > canvas.height) {
          stars[i].y = 0;
          stars[i].x = randomInt(0, canvas.width);
        } else if (stars[i].y < 0) {
          stars[i].y = canvas.height;
          stars[i].x = randomInt(0, canvas.width);
        }
      }
    } else {
      for (var i = 0; i < stars.length; i += 2) {
        stars[i].y += stars[i].speed * mult;
        if (stars[i].y > canvas.height) {
          stars[i].y = 0;
          stars[i].x = randomInt(0, canvas.width);
        } else if (stars[i].y < 0) {
          stars[i].y = canvas.height;
          stars[i].x = randomInt(0, canvas.width);
        }
      }
    }
  }

  // function scrollStars(mult) {
  //   for (var i = 0; i < stars.length; i+=2){
  //       stars[i].y += stars[i].speed * mult;
  //     if (stars[i].y > canvas.height) {
  //       stars[i].y = 0;
  //       stars[i].x = randomInt(0,canvas.width);
  //     }
  //   }
  // }

  function twinkle(star) {
    stars[star].color = "#aaaaaa";
    var rand = randomInt(10, 70);
    setTimeout(() => { changeStar(star, "#cccccc", .25) }, rand);
    setTimeout(() => { changeStar(star, "#aaaaaa", -.25) }, (rand + randomInt(50, 80)));
    setTimeout(() => { changeStar(star, "#ffffff", .25) }, (rand + randomInt(120, 150)));
    setTimeout(() => { changeStar(star, "#aaaaaa", -.25) }, (rand + randomInt(180, 190)));
  }

  function changeStar(star, color, size) {
    stars[star].color = color;
    stars[star].radius += size;
  }

  generateStars();
  drawStars();

  setInterval(drawAndMove, 50)
  function drawAndMove() {
    moveStars();
    drawStars();
  }
  var scrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    if (window.scrollY < scrollY) {
      scrollStars(-0.5, true);
      scrollY = window.scrollY;
    } else {
      scrollStars(0.5, false);
      scrollY = window.scrollY;
    }
    drawStars();
  });

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawStars();
  });
});

window.onload = function() {
  const img = document.getElementById('logoImg');
  function calculateOpacity() {
    const maxOpacity = 1;
    const minOpacity = 0.8;
    const maxPosition = window.innerWidth - img.width;
    const currentPosition = parseFloat(img.style.left || 0);
    const normalizedPosition = currentPosition / maxPosition;
    let opacity = maxOpacity - (maxOpacity - minOpacity) * normalizedPosition;
    opacity = Math.max(opacity, minOpacity);
    return opacity;
  }

  function updateOpacity() {
    img.style.opacity = calculateOpacity();
  }
  img.addEventListener('animationiteration', updateOpacity);

  updateOpacity();
}

// Google Sheets Stuff

const calendarURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vT8T20PnJhqmGWRoioSBbgGOru87CKhDqfaBwCip8yaffcNZEacFMmpIagblVyT6laQUwLnGvmUvnCL/pub?gid=0&single=true&output=csv"

async function csvToArray(url) {
  try {
    const response = await fetch(url);

    const csvData = await response.text();

    console.log(csvData);

    var csvArray = csvData.split("\n");

    console.log(csvArray);

    document.getElementById('calendar').textContent = "";
    for (let i = 0; i < csvArray.length; i++) {
      var event = document.createElement("div");
      var date = document.createElement("span");
      var txt = document.createElement("span");
      event.classList.add("calendarEvent");
      date.textContent = csvArray[i].split(",")[0];
      date.style.fontWeight = "bold";
      txt.textContent = ": " + csvArray[i].split(",")[1];
      event.appendChild(date);
      event.appendChild(txt);
      document.getElementById('calendar').appendChild(event);
    }

    return csvArray;
  } catch (error) {
    console.error('Error fetching CSV:', error);
    return null;
  }
}

async function fetchData() {
  var calendar = await csvToArray(calendarURL);
}

fetchData();