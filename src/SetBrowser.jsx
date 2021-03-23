import SetCard from "./SetCard";

const SetBrowser = () => {
  return (
    <nav className="panel">
      <p className="panel-heading"> List of sets</p>
      <SetCard title="This mountain" />
      <SetCard title="This dark mountain" />
      <SetCard title="This tiny mountain" />
      <SetCard title="This mountain" />
      <SetCard title="This dark mountain" />
      <SetCard title="This tiny mountain" />
      <SetCard title="This mountain" />
      <SetCard title="This dark mountain" />
      <SetCard title="This tiny mountain" />
      <SetCard title="This mountain" />
      <SetCard title="This dark mountain" />
      <SetCard title="This tiny mountain" />
      <SetCard title="This tiny mountain" />
      <a className="panel-block">
        <span class="icon-text">
          <span class="icon">
            <i class="fas fa-plus"></i>
          </span>
          <span>Add new set</span>
        </span>
      </a>
      
    </nav>
  );
};

export default SetBrowser;