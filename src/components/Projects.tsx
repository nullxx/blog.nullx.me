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
    <div>
      <div class="flex md:block lg:flex sm:block space-x-3 items-center">
        <h1 class="mb-2 dark:text-dark-text-color">Projects</h1>
        <Paginate
          currentPage={currentPage}
          pageCount={pageCount}
          onChange={paginate}
        />
      </div>
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
  );
}
