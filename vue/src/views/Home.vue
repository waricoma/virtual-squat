<template>
  <div class="home">
    <!-- img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" / -->
    <div id="result_acc"></div>
    <br />
    <div id="count"></div>
    <br />
    <div id="status"></div>
    <br />
    <div id="result_gyro"></div>
    <a href="javascript:window.location.reload(true);">reload</a>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';
import delay from 'delay';

export default {
  name: 'Home',
  components: {
    // HelloWorld,
  },
  mounted() {
    let count = 0;
    let x = 0;
    let y = 0;
    let z = 0;
    let flag = true;

    window.addEventListener('devicemotion', async event => {
      x = event.accelerationIncludingGravity.x;
      y = event.acceleration.y;
      z = event.accelerationIncludingGravity.z;

      const result1 = document.getElementById('result_acc');
      result1.innerHTML = `
    重力加速度<br />
    X：${x.toFixed(2)}(m/s^2)<br />
    Y：${y.toFixed(2)}(m/s^2)<br />
    Z：${z.toFixed(2)}(m/s^2)<br />
    `;

      const countTarget = document.getElementById('count');
      const statusTarget = document.getElementById('status');

      if (!flag) {
        return;
      }

      flag = false;

      await delay(300);
      // しゃがみ
      if (parseInt(y.toFixed(2)) > 0.6) {
        statusTarget.innerHTML = 'しゃがみました！';
      }
      await delay(300);
      // 立ち上がり
      if (parseInt(y.toFixed(2)) < -0.5) {
        count++;
        countTarget.innerHTML = Math.floor(count) + ' 回';
        statusTarget.innerHTML = '立ち上がりました！';
      }
      flag = true;
    });
  },
};
</script>
