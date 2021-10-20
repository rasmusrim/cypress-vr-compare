# Cypress-vr-compare
## What is it?
A tool to compare the visual regression images from a Cypress visual regression test.

## Prerequisites
All vr images must be under a folder called `vr` in the hierarchy.

- `/base/vr/mapPage`- these images will be compare
- `/base/pages/mapPage`- these images will not be compare

## How does it work?
Copy the `base`, `actual`and `diff` folder to `/snapshots`.

    npm install
    npm start

