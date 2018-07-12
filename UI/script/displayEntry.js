let modal = document.getElementById('myModal');
let link = document.getElementsByClassName("link");      
let span = document.getElementsByClassName("close")[0];
let story = document.getElementById('story');
let deletebutton = document.getElementById('delete');

span.onclick = () => {
  modal.style.display = "none";
}

function showEntry(e) {
  e.preventDefault();    
  innerstory = '<img src="images/miss_u.jpg" width="300" height="300" align="left"> For so long, I wished for the day. The day that our love would find its way. From my heart and into your soul, The feeling so strong, I had no control. When then that day came, when I found you again, I vowed never to make the same mistake. I knew I would never let you go, For my life is now complete in a way I cannot show. For eternity I will spend making you believe, You are the sole reason that I breathe. My life is yours, my hopes and desires too. Until my dying day, my heart is reserved just for you. You are everything I could ever need and more, More than I deserve or would dare wish for. You are my baby, my angel, my dream girl I\'m thankful every day that you are my whole world. For the time I spend with you, my heart truly sings My one, My only, My EVERYTHING. Source: https://www.familyfriendpoems.com/poem/my-one-my-only-my-everything...For so long, I wished for the day. The day that our love would find its way. From my heart and into your soul, The feeling so strong, I had no control. When then that day came, when I found you again, I vowed never to make the same mistake. I knew I would never let you go, For my life is now complete in a way I cannot show. For eternity I will spend making you believe, You are the sole reason that I breathe. My life is yours, my hopes and desires too. Until my dying day, my heart is reserved just for you. You are everything I could ever need and more, More than I deserve or would dare wish for. You are my baby, my angel, my dream girl I\'m thankful every day that you are my whole world. For the time I spend with you, my heart truly sings My one, My only, My EVERYTHING. Source: https://www.familyfriendpoems.com/poem/my-one-my-only-my-everythingFor so long, I wished for the day. The day that our love would find its way. From my heart and into your soul, The feeling so strong, I had no control. When then that day came, when I found you again, I vowed never to make the same mistake. I knew I would never let you go, For my life is now complete in a way I cannot show. For eternity I will spend making you believe, You are the sole reason that I breathe. My life is yours, my hopes and desires too. Until my dying day, my heart is reserved just for you. You are everything I could ever need and more, More than I deserve or would dare wish for. You are my baby, my angel, my dream girl I\'m thankful every day that you are my whole world. For the time I spend with you, my heart truly sings My one, My only, My EVERYTHING. Source: https://www.familyfriendpoems.com/poem/my-one-my-only-my-everything...For so long, I wished for the day. The day that our love would find its way. From my heart and into your soul, The feeling so strong, I had no control. When then that day came, when I found you again, I vowed never to make the same mistake. I knew I would never let you go, For my life is now complete in a way I cannot show. For eternity I will spend making you believe, You are the sole reason that I breathe. My life is yours, my hopes and desires too. Until my dying day, my heart is reserved just for you. You are everything I could ever need and more, More than I deserve or would dare wish for. You are my baby, my angel, my dream girl I\'m thankful every day that you are my whole world. For the time I spend with you, my heart truly sings My one, My only, My EVERYTHING. Source: https://www.familyfriendpoems.com/poem/my-one-my-only-my-everything';
  story.innerHTML = innerstory;
  modal.style.display = "block";
}

for (var i = 0; i < link.length; i++) {
  link[i].onclick = showEntry;
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = (event) => {
  if (event.target == modal) {
      modal.style.display = "none";
  }
}

deletebutton.onclick = () => {
  let ans = confirm('Are You Sure');
  if (ans) {
    alert('deleted successfully');
  } else {
    modal.style.display = "none";
  }
}
