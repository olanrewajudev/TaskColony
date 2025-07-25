import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AdminLayout from '../../../Components/Admin/AdminLayout';
import { Table } from '../../../Components/Admin/Table/Table';
import { TableRow } from '../../../Components/Admin/Table/TableRow';
import { TableData } from '../../../Components/Admin/Table/Index';
import { FaSearch } from 'react-icons/fa';
import { ImCancelCircle } from 'react-icons/im';
import { PiPencilSimpleLine } from 'react-icons/pi';
import { Link } from 'react-router-dom';
import { GiCancel } from 'react-icons/gi';
import PaginationButton from '../../../Components/General/Pagination/PaginationButton';
import { Apis, AuthGeturl, AuthPosturl } from '../../../Components/General/Api';
import ConfirmDeleteCategory from './DeleteCategory';
import UpdateCategory from './UpdateCategory';
import { ToastAlert } from '../../../Components/General/Utils';

const TABLE_HEADERS = ['Icon', 'Name', 'Status', ''];
const DEFAULT_PER_PAGE = 10;

const AllCategories = () => {
  const { admin } = useSelector(state => state.data);
  const userLevel = admin.userlevel;

  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [del, setDel] = useState(false);
  const [singles, setSingles] = useState({});
  const [loads, setLoads] = useState(false);
  const [view, setView] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const pageCount = Math.ceil(total / DEFAULT_PER_PAGE);

  const DeleteItem = (member) => {
    setDel(true);
    setSingles(member);
  };

  const confirmAction = async () => {
    if (!singles.trackid) {
      console.error('No category ID found to delete.');
      return;
    }

    const data = { data_tid: singles.trackid };
    setLoads(true);
    try {
      const res = await AuthPosturl(Apis.admins.delete_categories, data);
      setLoads(false);
      if (res.status) {
        setDel(false);
        setItems(prevItems => prevItems.filter(item => item.trackid !== singles.trackid));
        setFilteredItems(prevItems => prevItems.filter(item => item.trackid !== singles.trackid));
        setTotal(prevTotal => prevTotal - 1);
        ToastAlert('Category Deleted Successfully');
      } else {
        console.error('Error deleting category:', res.data.text);
      }
    } catch (error) {
      setLoads(false);
      console.error('Network request failed:', error);
    }
  };

  const fetchCategories = useCallback(async () => {
    let allCategories = [];
    let pageNo = 1;
    const perPage = 10; // Match backend's page size
    let totalPage = 1;

    try {
      while (pageNo <= totalPage) {
        const res = await AuthGeturl(`${Apis.admins.get_categories}?page_no=${pageNo}&no_perpage=${perPage}`);
        if (res.status) {
          const fetchedItems = res.data.data;
          totalPage = res.data.totalpage;

          if (Array.isArray(fetchedItems)) {
            allCategories = [...allCategories, ...fetchedItems];
          } else if (typeof fetchedItems === 'object' && fetchedItems !== null) {
            allCategories.push(fetchedItems);
          } else {
            console.error('Unexpected data structure');
          }
        } else {
          throw new Error('Failed to fetch data');
        }

        pageNo++;
      }

      setItems(allCategories);
      setFilteredItems(allCategories);
      setTotal(allCategories.length);
    } catch (err) {
      console.error(err.message);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const SingleItem = val => {
    setSingles(val);
    setView(!view);
  };

  const paginatedItems = filteredItems.slice(
    currentPage * DEFAULT_PER_PAGE,
    (currentPage + 1) * DEFAULT_PER_PAGE
  );

  const handlePageChange = (val) => {
    setCurrentPage(val.selected);
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = items.filter(item =>
      item.name.toLowerCase().includes(value) ||
      item.status.toString().toLowerCase().includes(value)
    );

    setFilteredItems(filtered);
    setTotal(filtered.length);
  };

  return (
    <AdminLayout>
      {del && <ConfirmDeleteCategory confirmAction={confirmAction} closeView={() => setDel(false)} isLoading={loads} />}
      {view && <UpdateCategory singles={singles} resendSignal={fetchCategories} closeView={() => setView(!view)} />}

      <div className="md:mx-10 mx-2 mb-10">
        <div className="bg-white mt-10 px-5 py-4 w-full">
          <div className="flex items-center justify-between">
            <div className="font-medium text-lg">Categories</div>
            <div className="md:flex hidden items-center gap-5">
              <label className="border gap-[10px] text-[#9C9C9C] flex items-center py-2.5 px-3 border-primary rounded-md">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-[16rem] bg-transparent placeholder:text-[16px] placeholder:text-primary outline-none"
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <FaSearch size={16} />
              </label>
              <span className="text-primary text-2xl"><GiCancel /></span>
            </div>
          </div>
        </div>
        <div className="flex items-start mb-10 justify-start">
          <Table headers={TABLE_HEADERS} className='mt-10 bg-white'>
            {paginatedItems.map((member, index) => (
              <TableRow className='mb-10' key={index}>
                <TableData className='flex gap-2 items-center'>
                  <div className='w-16 h-16 bg-secondary p-4 rounded-full overflow-hidden'>
                    <img className='w-full h-full object-contain' src={member.icon_image} alt={member.name} />
                  </div>
                </TableData>
                <TableData>{member.name}</TableData>
                <TableData>
                  <span
                    className={`font-medium px-3 py-1 rounded-full text-white ${member.status === 1 ? 'bg-green-600' : 'bg-red-600'}`}
                  >
                    {member.status === 1 ? 'ACTIVE' : 'INACTIVE'}
                  </span>
                </TableData>
                <TableData>
                  <div className="flex gap-4 text-primary">
                    {userLevel !== "4" && (
                      <>
                        <div className="cursor-pointer" onClick={() => SingleItem(member)}><PiPencilSimpleLine /></div>
                        <div className="cursor-pointer" onClick={() => DeleteItem(member)}><ImCancelCircle /></div>
                      </>
                    )}
                  </div>
                </TableData>
              </TableRow>
            ))}
            <div className="mt-10 mb-5 mx-10">
              {userLevel !== "4" && (
                <Link to='/auth/admin/new-category' className="bg-pink w-fit px-4 py-2 text-white rounded-md">
                  <button>Add Category</button>
                </Link>
              )}
              <PaginationButton
                pageCount={pageCount}
                onPageChange={handlePageChange}
              />
            </div>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AllCategories;