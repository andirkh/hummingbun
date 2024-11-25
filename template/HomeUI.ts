import footer from './partials/footer';
import header from './partials/header';
import meta from './partials/meta';

import { theme } from '../constants';

import type { Content } from '../src/types/Content';

const HomeUI = (
  contents: Content[],
  prev: string,
  next: string,
): string => String.raw`
  <!DOCTYPE html>
  <html lang="en" theme="${theme}">
  <head>
    ${meta}
    <title>Home</title>
  </head>
  <body>
    ${header}
    <div class="flex flex-start justify-center my-3 gap-3">
      ${contents
        .map((obj, index) => {
          return String.raw`
          <div class="card w-96 bg-base-100 shadow-xl" index="${index}">
            <figure><img src="${obj.image}" alt="Shoes" /></figure>
            <div class="card-body">
              <h2 class="card-title">${obj.title}</h2>
              <a href="/post/${obj.slug}" class="card-actions justify-end">
                <button class="btn btn-primary">Read More</button>
              </a>
            </div>
          </div>
        `;
        })
        .join('')}
    </div>
    <div class="flex justify-between align-items-center p-3">
      <div>
        ${prev ? String.raw`<a href="${prev}"><button class="btn">Prev</button></a>` : ''}
      </div>
      <div>
        ${next ? String.raw`<a href="${next}"><button class="btn">Next</button></a>` : ''}
      </div>
    </div>
    <div class="mt-5">
      ${footer}
    </div>
  </body>
  </html>
`;

export default HomeUI;
