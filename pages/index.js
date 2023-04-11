import { Fragment, useRef, useState } from "react";
import { TfiControlPlay } from "react-icons/tfi";

import { Dialog, Transition } from "@headlessui/react";

export default function Home() {
  const [disabled, setDisabled] = useState(false);
  const [search, setSearch] = useState([""]);
  const [songs, setSongs] = useState();
  const [filename, setFilename] = useState();
  const [previewURL, setPreviewURL] = useState();
  const [open, setOpen] = useState(false);

  const cancelButtonRef = useRef(null);

  function handleChange(e) {
    setSearch(e.target.value);
  }

  async function handleSearch(e) {
    e.preventDefault();

    setDisabled(true);
    setSongs("");

    const response = await fetch(
      "https://freesound.org/apiv2/search/text/?fields=id,name,previews&query=" +
        search,
      {
        headers: {
          Authorization: "Token Dyjz7trmYZEG0jDK4eoWttjQK298Z94znjHRrf0T",
        },
      }
    );
    const results = await response.json();
    //console.log(results);
    setSongs(results);
    setDisabled(false);
  }

  async function handleNext() {
    setSongs("");
    setDisabled(true);
    const response = await fetch(songs.next, {
      headers: {
        Authorization: "Token Dyjz7trmYZEG0jDK4eoWttjQK298Z94znjHRrf0T",
      },
    });
    const results = await response.json();
    //console.log(results);
    setSongs(results);
    setDisabled(false);
  }

  async function handlePrevious() {
    setSongs("");
    setDisabled(true);
    const response = await fetch(songs.previous, {
      headers: {
        Authorization: "Token Dyjz7trmYZEG0jDK4eoWttjQK298Z94znjHRrf0T",
      },
    });
    const results = await response.json();
    //console.log(results);
    setSongs(results);
    setDisabled(false);
  }

  function handleSong(song) {
    setOpen(true);
    setFilename(song.name);
    setPreviewURL(song.previews["preview-lq-mp3"]);
  }

  return (
    <>
      <div className="container mx-auto mt-5">
        <form onSubmit={handleSearch}>
          <div className="block mb-2 text-2xl font-medium text-gray-900 dark:text-white">
            Search Freesound
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-3">
              <input
                type="text"
                id="search"
                value={search}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Type here..."
                required
                disabled={disabled}
              />
            </div>

            <div className="col-span-1">
              {!disabled && (
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Search
                </button>
              )}
            </div>
          </div>
        </form>

        {songs && (
          <div>
            <div className="mt-5 text-lg text-gray-400">Results</div>
            <div>
              <ul>
                <div>
                  {songs.results.map((song, index) => (
                    <li
                      className="pt-3 pb-3 border-t border-b border-gray-100 flex cursor-pointer"
                      key={index}
                      onClick={() => handleSong(song)}
                    >
                      <div className="mt-1 mr-3">
                        <TfiControlPlay></TfiControlPlay>
                      </div>
                      <div>{song.name}</div>
                    </li>
                  ))}
                </div>
              </ul>

              <div className="flex justify-between mt-4 mb-10">
                <div className="col-span-1">
                  {songs.previous && (
                    <button
                      type="submit"
                      className="text-black bg-blue-300 hover:bg-blue-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
                      onClick={handlePrevious}
                    >
                      Previous
                    </button>
                  )}
                </div>
                {songs.next && (
                  <div className="col-span-1">
                    <button
                      type="submit"
                      className="text-black bg-blue-300 hover:bg-blue-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
                      onClick={handleNext}
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        Filename: {filename}
                        <div className="mt-2">
                          <audio controls src={previewURL} autoPlay>
                            <a href={previewURL}>Download audio</a>
                          </audio>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
