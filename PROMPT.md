# PROMPT.md

This file explains what this project is and how it was built, in plain language.

---

## What is this?

CreatorSpace is a content publishing app — think of it like a stripped-down version of Medium or Dev.to.

You open the app, write a post (title + description), attach a cover image, and hit publish. Your post shows up in a live feed that everyone can browse. You can also search through posts by title or description. If you want to remove a post, you click delete and it's gone — including the image from Cloudinary.

That's it. Simple, clean, and real.

---

## Why was it built this way?

The goal was to build a proper full-stack MERN application that doesn't cut corners.

- The backend has real validation, proper error handling, a repository pattern to keep the database logic separate, and a service layer for business logic
- The frontend is structured like a real production app — hooks for data fetching, components with a single responsibility, and a shared constants file for things like animation configs and character limits
- Images are managed properly — when you delete a post, the image also gets deleted from Cloudinary so you don't accumulate orphaned files
- The search bar actually filters the live data in real time, and auto-scrolls you down to the results so you can see them

---

## How the image upload works

When you pick an image in the form, it goes from your browser → backend → Cloudinary. The backend receives the file in memory using Multer (it never touches the disk), streams it directly to Cloudinary, gets back a URL, and saves that URL in MongoDB alongside your post title and description.

When you delete a post, the backend reads the Cloudinary URL, extracts the `public_id` from it, and calls `cloudinary.uploader.destroy()` to remove the image before deleting the database record.

---

## How search works

The search input lives in the navbar. When you type, it passes the query string down to the feed component, which filters the already-loaded posts by title and description. No extra API calls — everything happens on the data that's already in memory.

When you start typing, the page automatically scrolls down to the feed so you can see the filtered results without having to scroll yourself.

---

## Stack decisions

**Why Cloudinary?** Free tier is generous, the Node SDK is straightforward, and the URL structure makes it easy to extract the `public_id` later for deletion.

**Why React Hook Form?** Less re-rendering than controlled inputs, built-in validation, and a much smaller API surface than alternatives.

**Why Framer Motion?** Declarative animations that feel premium without writing CSS keyframes by hand. The floating card collage in the hero uses looping `y` animations with different durations and delays to make them feel organic.

**Why the repository pattern on the backend?** It keeps the service layer clean. If you want to swap MongoDB for Postgres later, you only touch the repository — the service and controller stay the same.

---

## Deployment

The app is deployed on Render using a `render.yaml` blueprint file that defines both the backend API service and the frontend static site in one place. See the README for the full deployment steps.
