import { MarkdownInstance } from "astro";
import { useEffect, useState } from "preact/hooks";
import Paginate from "./Paginate";
import ProjectPreview, { Project } from "./ProjectPreview";

export interface Props {
  unsortedProjects: Project[];
}

export default function Projects({ unsortedProjects }: Props) {
  const projects = unsortedProjects.sort(function (a, b) {
    return new Date(b.date).valueOf() - new Date(a.date).valueOf();
  });

  const [opened, setOpened] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(4);
  const [currentProjects, setCurrentProjects] = useState(
    projects.slice(0, projectsPerPage)
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  let pageCount = Math.ceil(projects.length / projectsPerPage);

  useEffect(() => {
    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;

    setCurrentProjects(projects.slice(indexOfFirstProject, indexOfLastProject));
  }, [currentPage]);

  return (
    <div class="flex justify-center">
      <button
        type="button"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
        onclick={() => setOpened(true)}
      >
        Show projects
      </button>

      {/* Modal */}
      <div
        class={`absolute z-20 inset-0  h-screen overflow-y-scroll ${
          opened ? "block" : "hidden"
        }`}
      >
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div class="absolute inset-0 transition-opacity" aria-hidden="true">
            <div
              class="fixed inset-0 backdrop-blur-sm"
              onclick={() => setOpened(false)}
            ></div>

            {/* Modal content */}
            <div
              class="inline-block align-bottom bg-white text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:rounded-lg"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">
                  <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left flex items-center justify-between">
                    <h2
                      class="text-2xl leading-6 font-medium text-gray-900"
                      id="modal-headline"
                    >
                      Projects
                    </h2>
                    <button
                      type="button"
                      class="items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out block sm:hidden"
                      onclick={() => setOpened(false)}
                    >
                      x
                    </button>
                  </div>
                </div>
                <div class="flex justify-center">
                  <Paginate
                    currentPage={currentPage}
                    pageCount={pageCount}
                    onChange={paginate}
                  />
                </div>
                <div class="overflow-y-scroll h-full">
                  {currentProjects.map((project) => (
                    <ProjectPreview
                      date={project.date}
                      title={project.title}
                      external={project.external}
                      github={project.github}
                      cover={project.cover}
                      tech={project.tech}
                      url={project.url}
                      content={project.content}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
