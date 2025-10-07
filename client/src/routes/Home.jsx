export default function Home() {
  const videoUrl = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
  return (
    <div className="container-xxl py-4" style={{ maxWidth: "1440px" }}>
      <div className="p-4 mb-3 bg-light rounded-3">
        <h1 className="display-6 mb-1">GramVidya</h1>
        <p className="mb-0">
          Digital learning for rural schools, offline-first.
        </p>
      </div>
      <div className="row g-3">
        <div className="col-12 col-lg-8">
          <div className="card">
            <div className="card-header">Featured Lecture</div>
            <div className="card-body d-flex flex-wrap gap-2">
              <a
                className="btn btn-primary"
                href={videoUrl}
                target="_blank"
                rel="noreferrer"
              >
                <i className="bi bi-play-circle me-1"></i> Watch on YouTube
              </a>
              <a className="btn btn-outline-secondary" href={videoUrl} download>
                <i className="bi bi-download me-1"></i> Download Video
              </a>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-4">
          <div className="card h-100">
            <div className="card-header">Resources</div>
            <div className="card-body">
              <ul className="list-unstyled mb-0">
                <li className="mb-2">
                  <a href="#" className="link-primary">
                    Sample PDF 1
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="link-primary">
                    Sample PDF 2
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
