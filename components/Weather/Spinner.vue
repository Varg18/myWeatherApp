<template>
  <div class="simple-load-spinner"></div>
</template>

<style lang="css">
:root {
  --simple-load-spinner-size: 32px;
  --simple-load-spinner-thickness: 5px;

  --simple-load-spinner-bg-color: rgba(255, 255, 255, 0.25);
  --simple-load-spinner-fg-color: white;

  --simple-load-spinner-anim-delay: initial;
  --simple-load-spinner-anim-duration: 1s;
  --simple-load-spinner-anim-direction: initial;
  --simple-load-spinner-anim-fill-mode: initial;
  --simple-load-spinner-anim-iteration-count: infinite;
  --simple-load-spinner-anim-play-state: initial;
  --simple-load-spinner-anim-timing-function: linear;

  --simple-load-spinner-transform-deg: 315deg;
}

.simple-load-spinner {
  display: inline-block;
  position: relative;
  width: var(--simple-load-spinner-size);
  height: var(--simple-load-spinner-size);
  border: var(--simple-load-spinner-thickness) solid var(--simple-load-spinner-bg-color);
  border-right-color: var(--simple-load-spinner-fg-color);
  border-radius: 100%;
  box-sizing: border-box;
  transform: rotate(-45deg);

  animation-name: simple-load-spinner;
  animation-delay: var(--simple-load-spinner-anim-delay);
  animation-direction: var(--simple-load-spinner-anim-direction);
  animation-duration: var(--simple-load-spinner-anim-duration);
  animation-fill-mode: var(--simple-load-spinner-anim-fill-mode);
  animation-iteration-count: var(--simple-load-spinner-anim-iteration-count);
  animation-play-state: var(--simple-load-spinner-anim-play-state);
  animation-timing-function: var(--simple-load-spinner-anim-timing-function);
}

@keyframes simple-load-spinner {
  100% {
    transform: rotate(var(--simple-load-spinner-transform-deg));
  }
}

</style>
