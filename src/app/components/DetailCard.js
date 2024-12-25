function DetailCard({ icon, title, value }) {
    return (
      <div className="flex items-center space-x-4 bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out">
        <div>{icon}</div>
        <div>
          <p className="text-lg font-bold text-gray-800">{title}</p>
          <p className="text-gray-600">{value}</p>
        </div>
      </div>
    );
  }

export default DetailCard